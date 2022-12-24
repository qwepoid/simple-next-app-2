import { useRouter } from "next/router";
import { useMutation } from "react-query";

const useDeleteJob = () => {
  const router = useRouter();
  const deleteJobService = async (id: number) => {
    fetch(`http://localhost:5000/api/deleteJob?id=${id}`);
  };

  const deleteJob = (id: number) => {
    mutateDeleteFn(id);
  };

  const {
    mutate: mutateDeleteFn,
    data: deletedData,
    isError: isDeleteError,
  } = useMutation(deleteJobService, {
    onSuccess: () => router.replace("/job"),
  });

  return {
    deleteJob,
    deletedData,
    isDeleteError,
  };
};

export default useDeleteJob;
