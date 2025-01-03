import { useEffect, useState } from "react";
// import { useQuery } from "react-query";
import getScopeService from "../../../services/scope/getScopeService";

// const useGetScopeData = ({ searchString = "", isFiltered = 1 }) => {
//   const {
//     data: scopeData,
//     error: scopeError,
//     isError: isScopeError,
//     isLoading: isScopeLoading,
//     isLoadingError: isScopeLoadingError,
//     isRefetching: isScopeRefetching,
//     refetch: refetchScopeData,
//   } = useQuery(
//     ["isFiltered", searchString],
//     () => getScopeService(searchString),
//     {
//       staleTime: 10 * (60 * 1000),
//       cacheTime: 20 * (60 * 1000),
//     }
//   );

//   const formattedOutputData = useMemo(() => {
//     if (Array.isArray(scopeData)) {
//       return isFiltered
//         ? scopeData.map((scope: any) => {
//             return {
//               serial: scope?.nablSerial || "",
//               discipline: scope?.discipline || "",
//               group: scope?.group || "",
//               material: scope?.material || "",
//               parameter: scope?.parameter,
//               method: scope?.method || "",
//             };
//           })
//         : scopeData;
//     }
//   }, [scopeData]);
//   return {
//     scopeData: formattedOutputData,
//     scopeError,
//     isScopeError,
//     isScopeLoading,
//     isScopeLoadingError,
//     isScopeRefetching,
//     refetchScopeData,
//   };
// };

const useGetScopeData = ({
  searchString = "",
  isFiltered = 1,
  discipline,
  group,
  material,
  callByDefault = 1,
}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formattedOutputData = (scopeData) => {
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
  };

  async function getScopeData({
    discipline,
    group,
    material,
    searchString,
  }: {
    discipline?: string;
    group?: string;
    material?: string;
    searchString?: string;
  }) {
    setIsLoading(true);
    try {
      const response = await getScopeService(
        searchString,
        discipline,
        group,
        material
      );
      setData(formattedOutputData(response));
      return formattedOutputData(response);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (callByDefault === 1)
      getScopeData({ discipline, group, material, searchString });
  }, [callByDefault]);

  return {
    scopeData: data,
    isLoading,
    error,
    getScopeData,
  };
};

export default useGetScopeData;
