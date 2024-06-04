import { useMemo } from "react";
import { useQuery } from "react-query";
import getScopeService from "../../../services/scope/getScopeService";

const useGetScopeData = ({ searchString = "", isFiltered = 1 }) => {
  const {
    data: scopeData,
    error: scopeError,
    isError: isScopeError,
    isLoading: isScopeLoading,
    isLoadingError: isScopeLoadingError,
    isRefetching: isScopeRefetching,
    refetch: refetchScopeData,
  } = useQuery(
    ["isFiltered", searchString],
    () => getScopeService(searchString),
    {
      staleTime: 10 * (60 * 1000),
      cacheTime: 20 * (60 * 1000),
    }
  );

  const formattedOutputData = useMemo(() => {
    if (Array.isArray(scopeData)) {
      return isFiltered
        ? scopeData.map((scope: any) => {
            return {
              serial: scope?.nablSerial || "",
              discipline: scope?.discipline || "",
              group: scope?.group || "",
              material: scope?.material || "",
              parameter: scope?.parameter,
              method: scope?.method || "",
            };
          })
        : scopeData;
    }
  }, [scopeData]);
  return {
    scopeData: formattedOutputData,
    scopeError,
    isScopeError,
    isScopeLoading,
    isScopeLoadingError,
    isScopeRefetching,
    refetchScopeData,
  };
};

export default useGetScopeData;
