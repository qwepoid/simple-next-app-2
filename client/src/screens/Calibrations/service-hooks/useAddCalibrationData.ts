import { useMutation } from "react-query";

const useAddCalibrationData = () => {
  const addCalibrationService = async (payload) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/addEquipment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());
  };

  const addCalibration = async (payload) => {
    mutateAddCalibration(payload);
  };

  const {
    mutate: mutateAddCalibration,
    isError: isAddCalibrationError,
    isLoading: isAddCalibrationLoading,
    data: addCalibrationSuccessData,
    error: addCalibrationError
  } = useMutation(addCalibrationService);

  // const { data, isError, isLoading } = useMutation({
  //   mutationFn: addJob,
  //   onSuccess: (result) => console.log("result: ", result),
  // });

  return {
    addCalibrationSuccessData,
    addCalibration,
    isAddCalibrationLoading,
    isAddCalibrationError,
    addCalibrationError
  };
};

export default useAddCalibrationData;
