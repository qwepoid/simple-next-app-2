import { useEffect, useState } from "react";
import getMaterialsService from "../../../services/scope/getMaterialsService";

const useGetMaterialsList = ({
  callByDefault = 0,
  discipline = "",
  group = "",
}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getMaterials({
    discipline,
    group,
  }: {
    discipline?: string;
    group?: string;
  }) {
    setIsLoading(true);
    try {
      const response = await getMaterialsService({ discipline, group });
      setData(response);
      return response;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (callByDefault === 1) getMaterials({ discipline, group });
  }, [callByDefault]);

  return {
    data,
    isLoading,
    error,
    getMaterials,
  };
};

export default useGetMaterialsList;
