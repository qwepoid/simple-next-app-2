import { useEffect, useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import {
  getAllDocs,
  getAllDocs1,
} from "../../../services/firebase/firebaseUtils";

const useSubmitNewQuotation = () => {
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isPaused,
    isSuccess,
    mutate,
    mutateAsync,
    reset,
    status,
  } = useMutation(() => getAllDocs1("calibrations"));
  const {
    data: calibrationData,
    error: calibrationError,
    isError: isCalibrationError,
    isLoading: isCalibrationLoading,
    isLoadingError: isCalibrationLoadingError,
    isRefetching: isCalibrationRefetching,
    refetch: refetchCalibrationData,
  } = useQuery([], () => getAllDocs1("calibrations"));

  //   id: "ERL/INS/001",
  //   section: "Cement",
  //   insName: "Jon",
  //   calibratedBy: "AECPL",
  //   ulr: "CC132323R2R23R2232322F",
  //   lastCalibDate: new Date("2022-04-01"),
  //   calibDueDate: new Date("2022-04-30"),
  const formattedOutputData = useMemo(() => {
    if (calibrationData) {
      return calibrationData.map((calibration: any) => {
        return {
          id: calibration.equipmentId || "",
          section: calibration.section || "",
          insName: calibration.equipName || "",
          calibratedBy: calibration.calibratedBy || "",
          ulr: "",
          lastCalibDate: calibration.lastCalibDate || "",
          calibDueDate: calibration.nextCalibDate || "",
        };
      });
    }
  }, [calibrationData]);

  return {
    calibrationData: formattedOutputData,
    calibrationError,
    isCalibrationError,
    isCalibrationLoading,
    isCalibrationLoadingError,
    isCalibrationRefetching,
    refetchCalibrationData,
  };
};

export default useSubmitNewQuotation;
