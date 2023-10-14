import { useEffect, useState } from "react";
import { getServiceRequestsService } from "../../../services/serviceRequests";
const useGetServiceRequests = (callByDefault = 0) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getServiceRequests({
    id = "",
    searchString = "",
  }: {
    id?: String;
    searchString?: String;
  }) {
    setIsLoading(true);
    try {
      const response = await getServiceRequestsService({ id, searchString });
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (callByDefault === 1) getServiceRequests({});
  }, [callByDefault]);

  return {
    data,
    isLoading,
    error,
    getServiceRequests,
  };
};

export default useGetServiceRequests;
