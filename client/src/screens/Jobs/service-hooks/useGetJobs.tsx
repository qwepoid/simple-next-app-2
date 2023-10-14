import { useEffect, useState } from "react";
import getJobService from "../../../services/jobs/getJobs";
const useGetJobs = (callByDefault = 0) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getJobs({
    id = "",
    searchString = "",
  }: {
    id?: String;
    searchString?: String;
  }) {
    setIsLoading(true);
    try {
      const response = await getJobService({ id, searchString });
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (callByDefault === 1) getJobs({});
  }, [callByDefault]);

  return {
    data,
    isLoading,
    error,
    getJobs,
  };
};

export default useGetJobs;

// import { useQuery } from "react-query";
// import getJobService from "../../../services/jobs/getJobs";

// const useGetJobs = () => {
//   const { data, isError, isLoading } = useQuery("jobs", getJobService);

//   return {
//     data,
//     isLoading,
//     isError,
//   };
// };

// export default useGetJobs;
