import { useFormik } from "formik";
import { useRouter } from "next/router";
import { formikValidator, initialValues } from "./formikUtils";
import { FormikErrors } from "./types";
import { useState } from "react";
import dayjs from "dayjs";

const NewServiceRequest = () => {
  const router = useRouter();
  const handleJobOrderCreation = () => {
    router.push("/job/new");
  };

  const handleJobOrderCancellation = () => {
    router.push("/");
  };

  const { query, pathname } = useRouter();
  const isNew = pathname.includes("addNew") || false;
  const [isEditMode, setIsEditMode] = useState(true);

  const addItem = () => {
    formik.setFieldValue("sampleDetails", [
      ...formik.values.sampleDetails,
      {
        sampleDescription: "",
        samplingLocation: "",
        testPatameters: [],
        testMethod: "",
        quantity: "",
        packingDetails: "",
      },
    ]);
  };

  const removeItem = (index) => {
    const updatedSampleDetails = [...formik.values.sampleDetails];
    updatedSampleDetails.splice(index, 1);
    formik.setFieldValue("sampleDetails", updatedSampleDetails);
  };

  const formik = useFormik({
    initialValues: initialValues,
    // validate: (values): FormikErrors => formikValidator(values),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      // if (isEditMode && !isNew) {
      //   Promise.resolve(updateQuotation(values)).then(() =>
      //     setIsEditMode((old) => !old)
      //   );
      // } else {
      //   Promise.resolve(addNewQuotation(values)).then(() =>
      //     setIsEditMode((old) => !old)
      //   );
      // }
    },
  });

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
                      // onClick={onHandleCancel}
                      className="border border-black w-24 p-1 rounded-lg justify-self-end hover:scale-105"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              )}
            </div>
            <span className="text-lg font-medium text-gray-500 list-item col-span-2">
              Client Details
            </span>
            <div className="flex col-span-2 gap-2 justify-between">
              <div className="flex flex-col">
                <div className="w-48 flex flex-col">
                  <label className="text-xs text-gray-400">
                    Customer Name & Address*
                  </label>
                  {/* TODO: Try to remove textarea and move everything to span using
                  contentEditable */}
                  {isEditMode ? (
                    <textarea
                      id={`customerDetails.customerNameAddress`}
                      className="outline-none border-2 rounded-lg p-2 w-96 col-span-2"
                      placeholder="eg. M/s Engg Research Labs"
                      onChange={formik.handleChange}
                      value={formik.values.customerDetails?.customerNameAddress}
                      wrap="soft"
                    />
                  ) : (
                    <span
                      id="customerNameAddress"
                      className="outline-none rounded-lg p-2 w-96 col-span-2"
                    >
                      {formik.values.customerDetails?.customerNameAddress}
                    </span>
                  )}
                </div>
                <div>
                  {formik.touched.customerDetails?.customerNameAddress &&
                  formik.errors.customerDetails?.customerNameAddress ? (
                    <div className="text-xs text-red-500 font-semibold">
                      {formik.errors.customerDetails?.customerNameAddress}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="w-48 flex flex-col">
                  <label className="text-xs text-gray-400">Date of SR*</label>
                  {isEditMode ? (
                    <input
                      type="date"
                      id="dateOfSR"
                      className="outline-none border-2 rounded-lg p-2 col-span-2"
                      placeholder=""
                      onChange={formik.handleChange}
                      value={formik.values.dateOfSR}
                    />
                  ) : (
                    <span className="outline-none rounded-lg p-2 col-span-2">
                      {dayjs(formik.values.dateOfSR).format("DD/MM/YYYY")}
                    </span>
                  )}
                </div>
                <div>
                  {formik.touched.dateOfSR && formik.errors.dateOfSR ? (
                    <div className="text-xs text-red-500 font-semibold">
                      {formik.errors.dateOfSR}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <span className="text-lg font-medium text-gray-500 list-item col-span-2">
              Customer Representative Details
            </span>
            <div className="flex col-span-2 gap-2 justify-between">
              <div className="flex flex-col">
                <div className="w-48 flex flex-col">
                  <label className="text-xs text-gray-400">
                    Representative Name*
                  </label>
                  {/* TODO: Try to remove textarea and move everything to span using
                  contentEditable */}
                  {isEditMode ? (
                    <input
                      id={`customerDetails.customerRepName`}
                      className="outline-none border-2 rounded-lg p-2 col-span-2"
                      placeholder="eg. Naresh Gupta"
                      onChange={formik.handleChange}
                      value={formik.values.customerDetails?.customerRepName}
                      wrap="soft"
                    />
                  ) : (
                    <span
                      id="quotationTo"
                      className="outline-none rounded-lg p-2 w-96 col-span-2"
                    >
                      {formik.values.customerDetails?.customerRepName}
                    </span>
                  )}
                </div>
                <div>
                  {formik.touched.customerDetails?.customerRepName &&
                  formik.errors.customerDetails?.customerRepName ? (
                    <div className="text-xs text-red-500 font-semibold">
                      {formik.errors.customerDetails?.customerRepName}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="w-48 flex flex-col">
                  <label className="text-xs text-gray-400">
                    Representative Phone No. *
                  </label>
                  {/* TODO: Try to remove textarea and move everything to span using
                  contentEditable */}
                  {isEditMode ? (
                    <input
                      id={`customerDetails.customerRepPhone`}
                      className="outline-none border-2 rounded-lg p-2 col-span-2"
                      placeholder="9XXXXXXXXX"
                      onChange={formik.handleChange}
                      value={formik.values.customerDetails?.customerRepPhone}
                      wrap="soft"
                    />
                  ) : (
                    <span
                      id="quotationTo"
                      className="outline-none rounded-lg p-2 w-96 col-span-2"
                    >
                      {formik.values.customerDetails?.customerRepPhone}
                    </span>
                  )}
                </div>
                <div>
                  {formik.touched.customerDetails?.customerRepPhone &&
                  formik.errors.customerDetails?.customerRepPhone ? (
                    <div className="text-xs text-red-500 font-semibold">
                      {formik.errors.customerDetails?.customerRepPhone}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <span className="mt-4 text-lg font-medium text-gray-500 list-item col-span-2">
              Sample Details
            </span>
            <div className="w-full flex flex-col lg:col-span-2">
              {formik.values.sampleDetails.map((_, index) => (
                <div key={index} className="mt-4">
                  <div className="font-medium bg-slate-200">
                    Item {index + 1}:
                  </div>
                  <div className="flex lg:col-span-2 gap-2 justify-between">
                    <div className="flex flex-col">
                      <label
                        htmlFor={`sampleDetails.${index}.sampleDescription`}
                        className="text-xs text-gray-400"
                      >
                        Sample Desctiption*:
                      </label>
                      {isEditMode ? (
                        <input
                          className="
                        outline-none border-2 rounded-lg p-2  text-sm"
                          id={`sampleDetails.${index}.sampleDescription`}
                          name={`sampleDetails.${index}.sampleDescription`}
                          onChange={formik.handleChange}
                          value={
                            formik.values.sampleDetails[index].sampleDescription
                          }
                        />
                      ) : (
                        <span className="outline-none rounded-lg p-2 text-sm">
                          {formik.values.sampleDetails[index].sampleDescription}
                        </span>
                      )}

                      <div>
                        {formik.touched.sampleDetails?.[index]
                          ?.sampleDescription &&
                        formik.errors.sampleDetails?.[index]
                          ?.sampleDescription ? (
                          <div className="text-xs text-red-500 font-semibold">
                            {
                              formik.errors.sampleDetails[index]
                                ?.sampleDescription
                            }
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-40 flex flex-col">
                      <label
                        htmlFor={`sampleDetails.${index}.quantity`}
                        className="text-xs text-gray-400"
                      >
                        Quantity*
                      </label>
                      {isEditMode ? (
                        <input
                          className="outline-none border-2 rounded-lg p-2 w-full col-span-2"
                          id={`sampleDetails.${index}.quantity`}
                          name={`sampleDetails.${index}.quantity`}
                          onChange={formik.handleChange}
                          value={formik.values.sampleDetails[index].quantity}
                        />
                      ) : (
                        <span>
                          {formik.values.sampleDetails[index].quantity}
                        </span>
                      )}

                      <div>
                        {formik.touched.sampleDetails?.[index]?.quantity &&
                        formik.errors.sampleDetails?.[index]?.quantity ? (
                          <div className="text-xs text-red-500 font-semibold">
                            {formik.errors.sampleDetails?.[index]?.quantity}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-40 flex flex-col">
                      <label
                        htmlFor={`sampleDetails.${index}.samplingLocation`}
                        className="text-xs text-gray-400"
                      >
                        samplingLocation*
                      </label>
                      {isEditMode ? (
                        <input
                          className="outline-none border-2 rounded-lg p-2 w-full col-span-2"
                          id={`sampleDetails.${index}.samplingLocation`}
                          name={`sampleDetails.${index}.samplingLocation`}
                          type="text"
                          onChange={formik.handleChange}
                          value={
                            formik.values.sampleDetails[index].samplingLocation
                          }
                        />
                      ) : (
                        <span>
                          {formik.values.sampleDetails[index].samplingLocation}
                        </span>
                      )}

                      <div>
                        {formik.touched.sampleDetails?.[index]
                          ?.samplingLocation &&
                        formik.errors.sampleDetails?.[index]
                          ?.samplingLocation ? (
                          <div className="text-xs text-red-500 font-semibold">
                            {
                              formik.errors.sampleDetails?.[index]
                                ?.samplingLocation
                            }
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="flex lg:col-span-2 gap-2 justify-between">
                    <div className="w-full flex flex-col">
                      <label
                        htmlFor={`sampleDetails.${index}.testMethod`}
                        className="text-xs text-gray-400"
                      >
                        testMethods*
                      </label>
                      {isEditMode ? (
                        <div>
                          <textarea
                            className="outline-none border-2 rounded-lg p-2 w-full col-span-2"
                            id={`sampleDetails.${index}.testMethod`}
                            name={`sampleDetails.${index}.testMethod`}
                            onChange={formik.handleChange}
                            value={
                              formik.values.sampleDetails[index].testMethod
                            }
                          />
                          <span className="w-full text-xs text-green-700">
                            Add comma separated values
                          </span>
                        </div>
                      ) : (
                        <span>
                          {formik.values.sampleDetails[index].testMethod}
                        </span>
                      )}

                      <div>
                        {formik.touched.sampleDetails?.[index]?.testMethod &&
                        formik.errors.sampleDetails?.[index]?.testMethod ? (
                          <div className="text-xs text-red-500 font-semibold">
                            {formik.errors.sampleDetails?.[index]?.testMethod}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className={`mt-2 font-medium rounded-lg bg-red-400 text-white px-2 ${
                      !index && "hidden"
                    }`}
                  >
                    Remove Item
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addItem}
                className="w-fit mt-8 p-1 text-white bg-blue-400 rounded-lg"
              >
                Add New Sample Type
              </button>
            </div>
            <button type="submit">Generate Service Request</button>
            {/* <button onClick={downloadPdf}>Preview Pdf</button> */}
          </div>
          {/* // Preview starts here */}

          {/* {!!dataUrl ? (
            <div className="sm:hidden lg:block lg:grid lg:col-span-2 border border-black ml-4  w-[630px] h-[891px] rounded-md shadow-2xl flex flex-col flex-1 overflow-clip">
              <object
                data={dataUrl}
                type="application/pdf"
                width="100%"
                height="100%"
                className="hidden lg:block"
              >
                <p>
                  Alternative text - include a link{" "}
                  <a href={dataUrl}>to the PDF!</a>
                </p>
              </object>
            </div>
          ) : (
            <div
              className="sm:hidden lg:flex col-span-2 flex justify-center items-center text-7xl text-slate-300 cursor-pointer text-center place-self-center w-96 hover:scale-105"
              onClick={downloadPdf}
            >
              Click to see Preview
            </div>
          )} */}
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <div>
        <label htmlFor="client">Client</label>
        <input name="client" className="border mx-2" />
      </div>
      <div>
        <label htmlFor="sampleDescription">Sample Description</label>
        <input name="sampleDescription" className="border mx-2" />
      </div>
      <div>
        <label htmlFor="samplingLocation">Sampling Location</label>
        <input name="samplingLocation" className="border mx-2" />
      </div>
      <div>
        <label htmlFor="testParameters">Test Parameters</label>
        <select name="testParameters" className="border mx-2" multiple>
          <option>Acidity</option>
          <option>Alkalinity</option>
        </select>
      </div>
      <div>
        <label htmlFor="sampleQuantity">Sample Quantity</label>
        <input name="sampleQuantity" className="border mx-2" />
      </div>
      <div className="fixed bottom-20 flex w-full justify-around">
        <button
          onClick={handleJobOrderCreation}
          className="bg-blue-800 rounded-lg p-2 font-medium text-white"
        >
          Create Job Order
        </button>
        <button
          onClick={handleJobOrderCancellation}
          className="p-2 font-medium underline"
        >
          Save for later
        </button>
      </div>
    </div>
  );
};

export default NewServiceRequest;
