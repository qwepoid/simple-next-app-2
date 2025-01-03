import { useEffect, useState } from "react";
import getGroupsService from "../../../services/scope/getGroupsService";

const useGetGroupsList = ({ callByDefault = 0, discipline = "" }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getGroups({ discipline }: { discipline?: string }) {
    setIsLoading(true);
    try {
      const response = await getGroupsService({ discipline });
      setData(response);
      return response;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (callByDefault === 1) getGroups({ discipline });
  }, [callByDefault]);

  return {
    data,
    isLoading,
    error,
    getGroups,
  };
};

export default useGetGroupsList;
