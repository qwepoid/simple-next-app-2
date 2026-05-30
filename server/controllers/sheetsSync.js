import { google } from "googleapis";
import * as XLSX from "xlsx";
import { client } from "../index.js";

const SHEET_IDS = {
  bills: process.env.BILLS_SHEET_ID,

  reports: process.env.REPORTS_SHEET_ID,
};

const BILL_TABS = ["2024-25", "FY 2025-26"]; // add new FY tabs here each year
const REPORT_TAB = "REPORTS WEF JAN 25";

// S.NO | CLIENT | BILL NO | Bill File | DATE | BASIC | GST | TOTAL | RECEIVED | TDS | DUE | REMARKS | ...
const BILL_COL = {
  sno: 0,
  client: 1,
  billNo: 2,
  date: 4,
  basic: 5,
  gst: 6,
  total: 7,
  received: 8,
  tds: 9,
  due: 10,
  remarks: 11,
};

// S.NO | (empty) | (empty) | CLIENT | REPORT NO | (empty) | DATE
const REPORT_COL = {
  sno: 0,
  client: 1,
  reportNo: 5,
  date: 4,
};

function getAuthClient() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not configured");
  }

  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

  if (credentials.private_key) {
    credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
  }

  return new google.auth.GoogleAuth({
    credentials,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets.readonly",
      "https://www.googleapis.com/auth/drive.readonly",
    ],
  });
}

async function fetchTab(sheets, spreadsheetId, tabName) {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `'${tabName.replace(/'/g, "''")}'`,
    });
    return res.data.values || [];
  } catch (err) {
    throw new Error(
      `Failed to fetch tab "${tabName}" from ${spreadsheetId}: ${err.message}`,
    );
  }
}

async function fetchOfficeSheetTabAsRows(drive, fileId, tabName) {
  try {
    const response = await drive.files.get(
      { fileId, alt: "media", supportsAllDrives: true },
      { responseType: "arraybuffer" },
    );
    const workbook = XLSX.read(Buffer.from(response.data), { type: "buffer" });
    const worksheet = workbook.Sheets[tabName];

    if (!worksheet) {
      throw new Error(
        `Tab "${tabName}" was not found. Available tabs: ${workbook.SheetNames.join(", ")}`,
      );
    }

    return XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      raw: false,
      defval: "",
    });
  } catch (err) {
    throw new Error(
      `Failed to read Office file "${fileId}" from Drive: ${err.message}`,
    );
  }
}

function parseCurrency(val) {
  if (!val || typeof val !== "string") return 0;
  if (val.includes("#") || val === "-" || val === "Loading ...") return 0;
  const cleaned = val.replace(/[₹,\s]/g, "").trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function parseDate(val) {
  if (!val || val === "Loading ..." || val === "-") return null;
  // Handle formats: "30-Aug-2024", "14-Jan-2025", "6/12/2025", "2025-01-14"
  const cleaned = val.trim();
  const d = new Date(cleaned);
  if (!isNaN(d.getTime())) return d;
  // Try DD-Mon-YYYY
  const match = cleaned.match(/^(\d{1,2})[- ]([A-Za-z]+)[- ](\d{4})$/);
  if (match) {
    return new Date(`${match[2]} ${match[1]}, ${match[3]}`);
  }
  return null;
}

function parseBillRows(rows) {
  const bills = [];
  let headerFound = false;

  for (const row of rows) {
    // Skip until we find the header row
    if (!headerFound) {
      if (
        row.some(
          (cell) => typeof cell === "string" && cell.trim() === "CLIENTS NAME",
        )
      ) {
        headerFound = true;
      }
      continue;
    }

    const client = (row[BILL_COL.client] || "").trim();
    const billNo = (row[BILL_COL.billNo] || "").trim();
    if (!client || client === "CLIENTS NAME") continue;

    const total = parseCurrency(row[BILL_COL.total]);
    const received = parseCurrency(row[BILL_COL.received]);
    const due = parseCurrency(row[BILL_COL.due]);
    const tds = parseCurrency(row[BILL_COL.tds]);
    const basic = parseCurrency(row[BILL_COL.basic]);
    const gst = parseCurrency(row[BILL_COL.gst]);
    const date = parseDate(row[BILL_COL.date]);
    const remarks = (row[BILL_COL.remarks] || "").trim();

    // Skip completely empty rows
    if (total === 0 && basic === 0 && !billNo) continue;

    const isPaid =
      remarks.toLowerCase().includes("paid") || (due === 0 && received > 0);

    bills.push({
      client,
      billNo,
      date,
      basic,
      gst,
      total,
      received,
      tds,
      due,
      remarks,
      isPaid,
    });
  }

  return bills;
}

function parseReportRows(rows) {
  const reports = [];
  let headerColumns = null;

  for (const row of rows) {
    if (!headerColumns) {
      const columns = { ...REPORT_COL };
      let hasReportHeader = false;

      row.forEach((cell, index) => {
        const header = cell
          ?.toString()
          .trim()
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, "");

        if (header === "CLIENTNAME" || header === "CLIENTSNAME") {
          columns.client = index;
        }
        if (header === "REPORTNO" || header === "REPORTNOS") {
          columns.reportNo = index;
          hasReportHeader = true;
        }
        if (header === "DATE") {
          columns.date = index;
        }
      });

      if (hasReportHeader) headerColumns = columns;
      continue;
    }

    const client = (row[headerColumns.client] || "").trim();
    const reportNo = (row[headerColumns.reportNo] || "").trim();
    const date = parseDate(row[headerColumns.date]);

    if (!client && !reportNo) continue;

    reports.push({ client, reportNo, date });
  }

  return reports;
}

function aggregateBills(bills) {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  let totalBilledAllTime = 0;
  let totalReceivedAllTime = 0;
  let totalOutstanding = 0;
  let billedThisMonth = 0;
  let receivedThisMonth = 0;
  let countPaid = 0;
  let countUnpaid = 0;
  let countPartial = 0;
  let gstWithheld = 0;
  let tdsDeducted = 0;

  // Top outstanding clients (for owner view)
  const clientOutstanding = {};

  for (const bill of bills) {
    totalBilledAllTime += bill.total;
    totalReceivedAllTime += bill.received;
    totalOutstanding += bill.due;
    tdsDeducted += bill.tds;
    gstWithheld +=
      bill.due > 0 && bill.remarks.toLowerCase().includes("gst") ? bill.gst : 0;

    if (
      bill.date &&
      bill.date.getMonth() === thisMonth &&
      bill.date.getFullYear() === thisYear
    ) {
      billedThisMonth += bill.total;
      receivedThisMonth += bill.received;
    }

    if (bill.due === 0 && bill.received > 0) countPaid++;
    else if (bill.received > 0 && bill.due > 0) countPartial++;
    else if (bill.due > 0) countUnpaid++;

    if (bill.due > 0 && bill.client) {
      clientOutstanding[bill.client] =
        (clientOutstanding[bill.client] || 0) + bill.due;
    }
  }

  // Sort top outstanding clients
  const topOutstanding = Object.entries(clientOutstanding)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([client, amount]) => ({ client, amount }));

  return {
    totalBilledAllTime,
    totalReceivedAllTime,
    totalOutstanding,
    billedThisMonth,
    receivedThisMonth,
    outstandingThisMonth: billedThisMonth - receivedThisMonth,
    countPaid,
    countUnpaid,
    countPartial,
    totalBills: bills.length,
    gstWithheld,
    tdsDeducted,
    topOutstanding,
  };
}

function aggregateReports(reports) {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const thisWeekStart = new Date(now);
  thisWeekStart.setDate(now.getDate() - now.getDay());
  thisWeekStart.setHours(0, 0, 0, 0);

  let totalReports = 0;
  let reportsThisMonth = 0;
  let reportsThisWeek = 0;
  const clientCounts = {};

  for (const r of reports) {
    if (!r.reportNo) continue;
    totalReports++;

    if (r.date) {
      if (
        r.date.getMonth() === thisMonth &&
        r.date.getFullYear() === thisYear
      ) {
        reportsThisMonth++;
      }
      if (r.date >= thisWeekStart) {
        reportsThisWeek++;
      }
    }

    if (r.client) {
      clientCounts[r.client] = (clientCounts[r.client] || 0) + 1;
    }
  }

  const topClients = Object.entries(clientCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([client, count]) => ({ client, count }));

  const lastReport = [...reports].reverse().find((r) => r.reportNo);

  return {
    totalReports,
    reportsThisMonth,
    reportsThisWeek,
    topClients,
    lastReportNo: lastReport?.reportNo || null,
  };
}

async function buildSheetsDashboardSnapshot() {
  const DB = process.env.MONGO_DB;
  const auth = getAuthClient();
  const sheets = google.sheets({ version: "v4", auth });
  const drive = google.drive({ version: "v3", auth });

  if (!DB) {
    throw new Error("MONGO_DB is not configured");
  }

  const dashboardCache = client.db(DB).collection("dashboardCache");

  let allBills = [];
  for (const tab of BILL_TABS) {
    const rows = await fetchTab(sheets, SHEET_IDS.bills, tab);
    allBills = allBills.concat(parseBillRows(rows));
  }

  const reportRows = await fetchOfficeSheetTabAsRows(
    drive,
    SHEET_IDS.reports,
    REPORT_TAB,
  );
  const allReports = parseReportRows(reportRows);
  const snapshot = {
    key: "sheets_dashboard",
    syncedAt: new Date(),
    bills: aggregateBills(allBills),
    reports: aggregateReports(allReports),
    rawCounts: {
      bills: allBills.length,
      reports: allReports.length,
    },
  };

  await dashboardCache.updateOne(
    { key: "sheets_dashboard" },
    { $set: snapshot },
    { upsert: true },
  );

  console.log(
    `[sheetsSync] Done. ${allBills.length} bills, ${allReports.length} reports synced at ${snapshot.syncedAt.toISOString()}`,
  );
  return snapshot;
}

async function getLatestSnapshot() {
  const DB = process.env.MONGO_DB;

  if (!DB) {
    throw new Error("MONGO_DB is not configured");
  }

  const doc = await client
    .db(DB)
    .collection("dashboardCache")
    .findOne({ key: "sheets_dashboard" });

  if (!doc) return null;

  return {
    syncedAt: doc.syncedAt,
    ageMinutes: Math.floor(
      (Date.now() - new Date(doc.syncedAt).getTime()) / 60000,
    ),
    bills: doc.bills,
    reports: doc.reports,
    rawCounts: doc.rawCounts,
  };
}

function isAuthorized(req) {
  if (!process.env.CRON_SECRET) return true;

  const secret = req.headers["x-cron-secret"] || req.body?.secret;
  return secret === process.env.CRON_SECRET;
}

export const getCachedDashboardSnapshot = async (req, res) => {
  try {
    const snapshot = await getLatestSnapshot();

    if (!snapshot) {
      return res.status(404).json({
        message:
          "No sync data yet. POST to this endpoint to run the first sync.",
      });
    }

    res.send(JSON.stringify(snapshot));
  } catch (error) {
    console.error("[sheetsSync] Failed to read dashboard cache:", error);
    res.status(500).json({ message: "Failed to read dashboard cache" });
  }
};

export const syncSheetsToDashboard = async (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const snapshot = await buildSheetsDashboardSnapshot();
    res.send(JSON.stringify({ ok: true, snapshot }));
  } catch (error) {
    console.error("[sheetsSync] Failed to sync sheets:", error);
    res.status(500).json({ message: "Sync failed", detail: error.message });
  }
};
