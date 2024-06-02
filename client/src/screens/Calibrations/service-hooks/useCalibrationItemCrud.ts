import { useState } from "react";
import updateEquipmentItem from "../../../services/calibration/updateEquipmentItem";

const useCalibrationItemCrud = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function updateCalibrationItemDetails(payload) {
    setIsLoading(true);
    try {
      const response = await updateEquipmentItem(payload);
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    data,
    isLoading,
    error,
    updateCalibrationItemDetails,
  };
};

export default useCalibrationItemCrud;
