import {  useMemo } from "react";
import { useQuery } from "react-query";
import fetchEquipmentDetails from "../../../services/calibration/fetchEquipmentDetails";

const useGetEquipmentDetails = ({equipmentId}) => {
  
    const {
        data: equipmentData,
        error: equipmentError,
        isError: isEquipmentError,
        isLoading: isEquipmentLoading,
        isLoadingError: isEquipmentLoadingError,
        isRefetching: isEquipmentRefetching,
        refetch: refetchEquipmentData,

      } = useQuery([equipmentId], () => fetchEquipmentDetails(equipmentId), {
        staleTime: 20 * (60 * 1000),
        cacheTime: 10 * (60 * 1000)
      });
    
      // const formattedOutputData = useMemo(() => {
      //   if (Array.isArray(equipmentData)) {
      //     return isFiltered ?
      //     equipmentData.map((calibration: any) => {
      //       return {
      //         erlId: calibration.erlId || '',
      //           section: calibration.section || '',
      //           equipName: calibration.equipName || '',
      //           calibrationBy: calibration.calibrationBy || '',
      //           ulr: calibration.ulr,
      //           calibrationFrom: calibration.calibrationFrom || '',
      //           calibrationTo: calibration.calibrationTo || '',
      //       }
      //     }) : equipmentData;
      //   }
      // }, [equipmentData]);
      return {
        equipmentData,
        equipmentError,
        isEquipmentError,
        isEquipmentLoading,
        isEquipmentLoadingError,
        isEquipmentRefetching,
        refetchEquipmentData,
      }
    }

export default useGetEquipmentDetails;