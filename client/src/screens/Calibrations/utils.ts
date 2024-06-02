import Papa from "papaparse";
import downloadFile from "../../utils/downloadFile/downloadFile";
import FileTypes from "../../utils/downloadFile/fileTypes";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export const getExpiringSoonData = (calibrations, threshold = 0) => {
  const today = new Date();
  let diffDays = 0;
  return calibrations.filter((calib) => {
    if (calib.calibrationTo.length) {
      const [day, month, year] = calib.calibrationTo.split("-");
      const parsedDate = new Date(Number(year), Number(month) - 1, Number(day));
      const diff = (parsedDate?.getTime() || 0) - today.getTime();
      diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      if (diffDays <= threshold && (threshold === 0 || diffDays > 0)) {
        return calib;
      }
    }
  });
};

function formatEquipmentList(list) {
  console.log("before formatting: ", list);
  let headers = [
    "erlId",
    "equipName",
    "discipline",
    "section",
    "makeModel",
    "serial",
    "range",
    "accuracy",
    "calibrationBy",
    "calibrationFrom",
    "calibrationTo",
    "yearOfMake",
    "purchasedOn",
    "billNo",
    "purchasedFrom",
    "baseRate",
    "gstRate",
    "finalRate",
    "isNABLCertificate",
    "isErlIdPresentOnCert",
    "ulr",
  ];
  let updatedList = [];
  list.slice(1).forEach((item, idx) => {
    let equip = {};
    if (item[0].length) {
      for (let i = 0; i < headers.length; i++) {
        equip[headers[i]] = item[i] ?? "";
      }
      updatedList.push(equip);
    }
  });
  console.log("upl: ", updatedList);
  // addCalibration({ data: updatedList });
}
export function handleFileInput(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target.result;

    Papa.parse(content, {
      complete: (results) => {
        formatEquipmentList(results.data);
        // Process the parsed CSV data as needed
      },
      error: (err) => {
        console.error(err);
      },
    });
  };
  reader.readAsText(file);
}

export function downloadCurrentScreenData(data) {
  var csv = Papa.unparse(data);
  downloadFile({
    data: csv,
    fileType: FileTypes.CSV,
    fileName: "calibrations.csv",
  });
}
export const generateFilterData = (calibrationData, onSelectionChange) => {
  return [
    {
      title: "All",
      handleClick: onSelectionChange,
      count: calibrationData.length,
    },
    {
      title: "Expired",
      handleClick: onSelectionChange,
      count: getExpiringSoonData(calibrationData, 0).length,
    },
    {
      title: "Expiring in 30 days",
      handleClick: onSelectionChange,
      count: getExpiringSoonData(calibrationData, 30).length,
    },
    {
      title: "Expiring in 60 days",
      handleClick: onSelectionChange,
      count: getExpiringSoonData(calibrationData, 60).length,
    },
  ];
};

export const formatDateForTable = (inputDate) => {
  if (!inputDate) return "";
  dayjs.extend(customParseFormat);
  console.log("new date: ", dayjs(new Date(inputDate)).format("DD-MM-YYYY"));
  const firstPart = inputDate.split("-")[0];

  // If year first, this is dayjs parsed date
  if (firstPart?.length == 4) {
    return dayjs(inputDate, "YYYY-MM-DD").format("DD-MM-YYYY");
  }
  // else this is a normal date.
  else {
    return inputDate;
  }
};
