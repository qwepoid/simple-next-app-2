import { useFormik } from "formik";
import { useRouter } from "next/router";
import { formikValidator, initialValues } from "./formikUtils";
import { FormikErrors } from "./types";
import { useEffect, useState } from "react";
import useServiceRequests from "./custom-hooks/useServiceRequests";
import ClientDetailsSection from "./components/ClientDetailsSections";
import ClientRepSection from "./components/ClientRepSections";
import SampleDetailsSections from "./components/SampleDetailsSections";
import useGetServiceRequests from "./custom-hooks/useGetServiceRequests";
import { JobStatus } from "../Jobs/JobDetails/types";

const NewServiceRequest = () => {
  const router = useRouter();

  const { query, pathname } = useRouter();
  const isNew = pathname.includes("new") || false;
  const [isEditMode, setIsEditMode] = useState(isNew);

  const { createServiceRequest, data, isLoading, error } = useServiceRequests();

  useEffect(() => {
    if (!isEditMode && isNew && data?.id) {
      router.replace(data.id);
    }
  }, [isEditMode, isNew, data]);

  useEffect(() => {
    if (query.id) {
      getServiceRequests({ id: query.id.toString() });
    }
  }, [query]);

  const formik = useFormik({
    initialValues: initialValues,
    validate: (values): FormikErrors => formikValidator(values),
    onSubmit: (values) => {
      if (isEditMode && !isNew) {
        // TODO: Write update function
        // Promise.resolve(updateQuotation(values)).then(() =>
        //   setIsEditMode((old) => !old)
        // );
      } else {
        Promise.resolve(createServiceRequest(values)).then(() =>
          setIsEditMode((old) => !old)
        );
      }
    },
  });

  function onHandleCancel() {
    formik.setValues(prefillData[0]);
    setIsEditMode(false);
  }

  const {
    getServiceRequests,
    data: prefillData,
    isLoading: isPrefillLoading,
  } = useGetServiceRequests();

  useEffect(() => {
    if (prefillData) formik.setValues(prefillData[0]);
  }, [prefillData]);
  console.log("prefill: ", prefillData);
  let k = -1;
  return (
    <div className="mt-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col lg:grid lg:grid-cols-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:col-span-2 gap-4">
            <div className="flex col-span-2 justify-between">
              {formik.values.title && (
                <span className="text-stone-800 mr-2 text-2xl">Title:</span>
              )}
              {isEditMode ? (
                <input
                  id="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  className="outline-none border-b-2 flex-1 mr-8 text-2xl text-stone-600 placeholder:font-light placeholder:text-2xl"
                  placeholder="Title ( . . . for internal reference only)"
                />
              ) : (
                <span className="flex-1 mr-8 text-2xl text-stone-600 placeholder:font-light placeholder:text-3xl">
                  {formik.values.title}
                </span>
              )}
              {!isNew && (
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
              )}
            </div>
            <ClientDetailsSection isEditMode={isEditMode} formik={formik} />

            <ClientRepSection isEditMode={isEditMode} formik={formik} />

            <SampleDetailsSections isEditMode={isEditMode} formik={formik} />

            <button type="submit">Generate Service Request</button>
          </div>
          {/* Right Side */}

          <div className="sm:hidden lg:block lg:grid lg:col-span-2 ml-4 flex flex-col mt-12 justify-end">
            {!isNew && (
              <div className="flex flex-col gap-4">
                <span className="text-lg font-medium text-gray-500 list-item col-span-2">
                  Jobs
                </span>
                {prefillData?.[0]?.sampleDetails?.map((sample, idx) => {
                  return sample.testParameters.map((parameter, pIdx) => {
                    k++;
                    return (
                      <a href={`/job/${prefillData?.[0].jobIds[k].id}`}>
                        <span className="h-fit">
                          <span className="mr-2">SR1J2:</span>
                          <span className="text-blue-500 underline">
                            {`${sample.sampleDescription}: ${parameter.parameter} Test`}
                          </span>
                          <span>
                            [{JobStatus[prefillData?.[0].jobIds[k].status]}]
                          </span>
                        </span>
                      </a>
                    );
                  });
                })}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewServiceRequest;
