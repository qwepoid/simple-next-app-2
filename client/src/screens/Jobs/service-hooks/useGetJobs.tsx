import { useQuery } from "react-query";
import getJobService from "../../../services/jobs/getJobs";

const useGetJobs = () => {
  const { data, isError, isLoading } = useQuery("jobs", getJobService);

  return {
    data,
    isLoading,
    isError,
  };
};

export default useGetJobs;
