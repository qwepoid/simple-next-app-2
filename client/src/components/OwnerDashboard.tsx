/**
 * components/OwnerDashboard.jsx
 *
 * Owner-only dashboard. Reads from /sync/sheets (Mongo cache).
 * Lab team never sees this component; gate it behind your auth check.
 *
 * Usage in a page:
 *   import OwnerDashboard from '../components/OwnerDashboard';
 *   // only render if user.role === 'owner'
 */

import { useEffect, useState } from "react";
import getSheetsDashboardData from "../services/dashboard/getSheetsDashboardData";
import syncSheetsDashboardData from "../services/dashboard/syncSheetsDashboardData";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n || 0);

const fmtNum = (n) => new Intl.NumberFormat("en-IN").format(n || 0);

function MetricCard({ label, value, sub = null, color }) {
  return (
    <div
      style={{
        background: "var(--card-bg, #fff)",
        border: "0.5px solid #e0e0e0",
        borderRadius: 12,
        padding: "16px 20px",
        borderTop: `3px solid ${color || "#185FA5"}`,
      }}
    >
      <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>
        {label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 500,
          color: "#1a1a1a",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: "#999", marginTop: 4 }}>{sub}</div>
      )}
    </div>
  );
}

function StaleBadge({ ageMinutes }) {
  if (ageMinutes === null) return null;
  const color =
    ageMinutes < 30 ? "#3B6D11" : ageMinutes < 240 ? "#854F0B" : "#A32D2D";
  const label =
    ageMinutes < 2
      ? "just updated"
      : ageMinutes < 60
        ? `${ageMinutes}m ago`
        : `${Math.floor(ageMinutes / 60)}h ago`;
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 500,
        padding: "2px 8px",
        borderRadius: 4,
        background: color + "20",
        color,
      }}
    >
      {label}
    </span>
  );
}

function SyncButton({ syncing, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={syncing}
      style={{
        fontSize: 12,
        padding: "6px 14px",
        borderRadius: 6,
        cursor: syncing ? "default" : "pointer",
        background: syncing ? "#eee" : "#E6F1FB",
        color: "#185FA5",
        border: "0.5px solid #B5D4F4",
        fontWeight: 500,
      }}
    >
      {syncing ? "Syncing..." : "Refresh from Sheets"}
    </button>
  );
}

export default function OwnerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [syncing, setSyncing] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const response = await getSheetsDashboardData();
      setData(response);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const triggerSync = async () => {
    setSyncing(true);
    try {
      await syncSheetsDashboardData();
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading)
    return (
      <div style={{ padding: 32, textAlign: "center", color: "#666" }}>
        Loading dashboard...
      </div>
    );

  if (error && !data)
    return (
      <div style={{ padding: "24px 0", fontFamily: "inherit" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>
            Owner dashboard
          </h2>
          <span style={{ flex: 1 }} />
          <SyncButton syncing={syncing} onClick={triggerSync} />
        </div>
        <div
          style={{
            padding: 24,
            color: "#A32D2D",
            background: "#FFF7F7",
            border: "0.5px solid #F0C8C8",
            borderRadius: 8,
          }}
        >
          <strong>Could not load dashboard:</strong> {error}
          <div style={{ marginTop: 8, color: "#666", fontSize: 13 }}>
            Use refresh to run the first Google Sheets sync.
          </div>
        </div>
      </div>
    );

  const { bills, reports, syncedAt, ageMinutes } = data;

  return (
    <div style={{ padding: "24px 0", fontFamily: "inherit" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>
          Owner dashboard
        </h2>
        <StaleBadge ageMinutes={ageMinutes} />
        <span style={{ flex: 1 }} />
        <SyncButton syncing={syncing} onClick={triggerSync} />
      </div>

      {/* Billing metrics */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#999",
          marginBottom: 10,
        }}
      >
        Billing
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 10,
          marginBottom: 24,
        }}
      >
        <MetricCard
          label="Total billed (all time)"
          value={fmt(bills.totalBilledAllTime)}
          sub={`${fmtNum(bills.totalBills)} bills`}
          color="#185FA5"
        />
        <MetricCard
          label="Total outstanding"
          value={fmt(bills.totalOutstanding)}
          sub={`${bills.countUnpaid} unpaid, ${bills.countPartial} partial`}
          color="#A32D2D"
        />
        <MetricCard
          label="Billed this month"
          value={fmt(bills.billedThisMonth)}
          sub={`Received ${fmt(bills.receivedThisMonth)}`}
          color="#3B6D11"
        />
        <MetricCard
          label="TDS deducted"
          value={fmt(bills.tdsDeducted)}
          sub="across all bills"
          color="#854F0B"
        />
      </div>

      {/* Report metrics */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#999",
          marginBottom: 10,
        }}
      >
        Reports issued
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 10,
          marginBottom: 24,
        }}
      >
        <MetricCard
          label="Total reports issued"
          value={fmtNum(reports.totalReports)}
          sub={reports.lastReportNo ? `Last: #${reports.lastReportNo}` : null}
          color="#534AB7"
        />
        <MetricCard
          label="This month"
          value={fmtNum(reports.reportsThisMonth)}
          color="#534AB7"
        />
        <MetricCard
          label="This week"
          value={fmtNum(reports.reportsThisWeek)}
          color="#0F6E56"
        />
      </div>

      {/* Top outstanding clients */}
      {bills.topOutstanding?.length > 0 && (
        <>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#999",
              marginBottom: 10,
            }}
          >
            Top outstanding clients
          </div>
          <div
            style={{
              background: "#fff",
              border: "0.5px solid #e0e0e0",
              borderRadius: 12,
              overflow: "hidden",
              marginBottom: 24,
            }}
          >
            {bills.topOutstanding.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 16px",
                  borderBottom:
                    i < bills.topOutstanding.length - 1
                      ? "0.5px solid #f0f0f0"
                      : "none",
                }}
              >
                <span style={{ fontSize: 13, color: "#1a1a1a" }}>
                  {row.client}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: row.amount > 100000 ? "#A32D2D" : "#854F0B",
                  }}
                >
                  {fmt(row.amount)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Top report clients */}
      {reports.topClients?.length > 0 && (
        <>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#999",
              marginBottom: 10,
            }}
          >
            Most active clients (by report count)
          </div>
          <div
            style={{
              background: "#fff",
              border: "0.5px solid #e0e0e0",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {reports.topClients.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 16px",
                  borderBottom:
                    i < reports.topClients.length - 1
                      ? "0.5px solid #f0f0f0"
                      : "none",
                }}
              >
                <span style={{ fontSize: 13, color: "#1a1a1a" }}>
                  {row.client}
                </span>
                <span
                  style={{ fontSize: 13, fontWeight: 500, color: "#534AB7" }}
                >
                  {row.count} reports
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <div
        style={{
          fontSize: 11,
          color: "#bbb",
          marginTop: 16,
          textAlign: "right",
        }}
      >
        Source: Bill Nos + REPORT NOS sheets - Last synced{" "}
        {new Date(syncedAt).toLocaleString("en-IN")}
      </div>
    </div>
  );
}
