import * as React from "react";
import useGetCalibrationData from "./service-hooks/useGetCalibrationData";
import { columns } from "./constants";
import {
  downloadCurrentScreenData,
  generateFilterData,
  getExpiringSoonData,
} from "./utils";
import useAddCalibrationData from "./service-hooks/useAddCalibrationData";
import Chip from "../../components/Chip";
import { useEffect, useState } from "react";
import CalibrationTable from "./CalibrationTable";
import EquipmentSearch from "./EquipmentSearch";
import { useRouter } from "next/router";

export default function StylingRowsGrid() {
  const [onScreenCalibrations, setOnScreenCalibrations] = useState([]);
  const [searchString, setSearchString] = useState("");
  const { calibrationData } = useGetCalibrationData({ searchString });
  const router = useRouter();
  const {
    addCalibrationSuccessData,
    addCalibration,
    isAddCalibrationLoading,
    isAddCalibrationError,
    addCalibrationError,
  } = useAddCalibrationData();

  function handleCalibrationFilters(idx: number) {
    let updatedData;
    switch (idx) {
      case 0:
        updatedData = calibrationData;
        break;
      case 1:
        updatedData = getExpiringSoonData(calibrationData, 0);
        break;
      case 2:
        updatedData = getExpiringSoonData(calibrationData, 30);
        break;
      case 3:
        updatedData = getExpiringSoonData(calibrationData, 60);
    }
    setOnScreenCalibrations(updatedData);
  }

  useEffect(() => {
    if (calibrationData) {
      setOnScreenCalibrations(calibrationData);
    }
  }, [calibrationData]);

  function handleSearch(searchQuery) {
    setSearchString(searchQuery);
  }

  function addNewRecord() {
    router.push("/calibrations/new");
  }

  return (
    <div className="flex flex-col justify-start items-start h-full">
      <div className="flex w-full justify-between items-center">
        <EquipmentSearch
          currentQuery={searchString}
          handleSearch={handleSearch}
        />
        <button
          className="border p-1 h-fit rounded-lg bg-blue-400 text-white"
          onClick={() => downloadCurrentScreenData(onScreenCalibrations)}
        >
          Download Screen Data
        </button>
        <button
          className="border p-1 h-fit rounded-lg bg-blue-400 text-white"
          onClick={addNewRecord}
        >
          Add new equipment
        </button>
      </div>
      {!searchString && calibrationData && (
        <Chip
          items={generateFilterData(calibrationData, handleCalibrationFilters)}
        />
      )}
      <CalibrationTable columns={columns} rows={onScreenCalibrations} />
    </div>
  );
}
