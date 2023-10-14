import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { initialValues } from "../formikUtils";
import DetailsSection from "./DetailsSection";
import useGetJobs from "../service-hooks/useGetJobs";
import useJob from "../service-hooks/useJob";

const JobDetails = () => {
  const router = useRouter();

  const { query } = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const { updateJob, isLoading: isJobUpdateLoading } = useJob();
  const { getJobs, data: prefillData, isLoading, error } = useGetJobs(1);

  useEffect(() => {
    if (query.id) {
      getJobs({ id: query.id.toString() });
    }
  }, [query]);

  const formik = useFormik({
    initialValues: initialValues,
    // validate: (values): FormikErrors => formikValidator(values),
    onSubmit: (values) => {
      if (isEditMode) {
        Promise.resolve(updateJob(values)).then(() =>
          setIsEditMode((old) => !old)
        );
      }
    },
  });

  function onHandleCancel(e) {
    e.preventDefault();
    formik.setValues(prefillData?.[0]);
    setIsEditMode(false);
  }

  useEffect(() => {
    if (prefillData) formik.setValues(prefillData[0]);
  }, [prefillData]);

  return (
    <div className="mt-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col lg:grid lg:grid-cols-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:col-span-2 gap-4">
            <div className="flex col-span-2 justify-between">
              {formik.values?.title && (
                <span className="text-stone-800 mr-2 text-2xl">Title:</span>
              )}
              {isEditMode ? (
                <input
                  id="title"
                  onChange={formik.handleChange}
                  value={formik.values?.title}
                  className="outline-none border-b-2 flex-1 mr-8 text-2xl text-stone-600 placeholder:font-light placeholder:text-2xl"
                  placeholder="Title ( . . . for internal reference only)"
                />
              ) : (
                <span className="flex-1 mr-8 text-2xl text-stone-600 placeholder:font-light placeholder:text-3xl">
                  {formik.values?.title}
                </span>
              )}
              <div className="col-start-2 justify-self-end">
                <button
                  className={`border border-black w-24 p-1 rounded-lg mr-4 hover:scale-105 ${
                    isEditMode && "bg-green-500 border-green-500 text-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (isEditMode) {
                      formik.handleSubmit();
                    } else {
                      setIsEditMode(true);
                    }
                  }}
                >
                  {isEditMode ? "Save" : "Edit"}
                </button>
                {isEditMode && (
                  <button
                    onClick={onHandleCancel}
                    className="border border-black w-24 p-1 rounded-lg justify-self-end hover:scale-105"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
            <DetailsSection isEditMode={isEditMode} formik={formik} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobDetails;
