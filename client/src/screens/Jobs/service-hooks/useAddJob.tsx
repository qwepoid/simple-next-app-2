import { useMutation } from "react-query";

const useAddJob = () => {
  const addJobService = async () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/addJob`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stage: "closed",
        title: "PowerGrid soil test",
        customerId: 1,
      }),
    }).then((res) => res.json());
  };

  const addJob = async () => {
    mutateAddJob();
  };

  const {
    mutate: mutateAddJob,
    isError: isAddError,
    isLoading: isAddLoading,
    data: addData,
  } = useMutation(addJobService);

  // const { data, isError, isLoading } = useMutation({
  //   mutationFn: addJob,
  //   onSuccess: (result) => console.log("result: ", result),
  // });

  return {
    addData,
    addJob,
    isAddLoading,
    isAddError,
  };
};

export default useAddJob;
