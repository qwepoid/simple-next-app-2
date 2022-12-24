import {  useMemo } from "react";
import { useQuery } from "react-query";
import getCalibrationsService from "../../../services/calibration/fetchCalibrationDetails";

const useGetCalibrationData = ({searchString = '', isFiltered = 1}) => {
  
    const {
        data: calibrationData,
        error: calibrationError,
        isError: isCalibrationError,
        isLoading: isCalibrationLoading,
        isLoadingError: isCalibrationLoadingError,
        isRefetching: isCalibrationRefetching,
        refetch: refetchCalibrationData,

      } = useQuery(['isFiltered' ,searchString], () => getCalibrationsService(searchString), {
        staleTime: 10 * (60 * 1000),
        cacheTime: 20 * (60 * 1000),
      });
    
      const formattedOutputData = useMemo(() => {
        if (Array.isArray(calibrationData)) {
          return isFiltered ?
          calibrationData.map((calibration: any) => {
            return {
              erlId: calibration.erlId || '',
                section: calibration.section || '',
                equipName: calibration.equipName || '',
                calibrationBy: calibration.calibrationBy || '',
                ulr: calibration.ulr,
                calibrationFrom: calibration.calibrationFrom || '',
                calibrationTo: calibration.calibrationTo || '',
            }
          }) : calibrationData;
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
      }
    }

export default useGetCalibrationData;