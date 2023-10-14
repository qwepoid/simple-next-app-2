import { useState } from "react";
import { updateJobService } from "../../../services/jobs";

const useJob = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function updateJob(payload) {
    setIsLoading(true);
    try {
      const response = await updateJobService(payload);
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    updateJob,
    data,
    isLoading,
    error,
  };
};

export default useJob;
