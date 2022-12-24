import { useQuery } from "react-query";
import getJobdDetailsService from "../../../services/jobs/getJobDetails";

const useGetJobDetails = (id: number) => {
  const { data, isError, isLoading } = useQuery("jobDetails", () =>
    getJobdDetailsService(id)
  );

  return {
    data,
    isLoading,
    isError,
  };
};

export default useGetJobDetails;
