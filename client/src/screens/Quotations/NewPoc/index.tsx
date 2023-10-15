import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FormikErrors } from "./types";
import { formikValidator, initialValues } from "./formikUtils";
import useAddNewQuotation from "../custom-hooks/useAddNewQuotation";
import { useRouter } from "next/router";
import useGetQuotations from "../custom-hooks/useGetQuotations";
import dayjs from "dayjs";
import updateQuotation from "../../../services/quotation/updateQuotation";

const NewPoc = () => {
  const router = useRouter();
  const { data, addNewQuotation, isLoading, error } = useAddNewQuotation();
  const {
    getQuotations,
    data: prefillData,
    isLoading: isPrefillLoading,
  } = useGetQuotations(1);
  const { query, pathname } = useRouter();
  const isNew = pathname.includes("addNew") || false;
  const [isEditMode, setIsEditMode] = useState(isNew);

  useEffect(() => {
    if (query.id) {
      getQuotations({ id: query.id.toString() });
    }
  }, [query]);

  function onHandleCancel() {
    formik.setValues(prefillData[0]);
    setIsEditMode(false);
  }

  useEffect(() => {
    if (!isEditMode && isNew && data.id) {
      router.replace(data.id);
    }
  }, [isEditMode, isNew, data]);

  useEffect(() => {
    if (prefillData) formik.setValues(prefillData[0]);
  }, [prefillData]);

  const formik = useFormik({
    initialValues: initialValues,
    validate: (values): FormikErrors => formikValidator(values),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      if (isEditMode && !isNew) {
        Promise.resolve(updateQuotation(values)).then(() =>
          setIsEditMode((old) => !old)
        );
      } else {
        Promise.resolve(addNewQuotation(values)).then(() =>
          setIsEditMode((old) => !old)
        );
      }
    },
  });
  const [dataUrl, setDataUrl] = useState("");

  async function downloadPdf() {
    fetch("http://localhost:5000/pdf/createQuotation", {
      method: "POST",
      body: JSON.stringify(formik.values),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async () => {
      const response = await fetch("http://localhost:5000/pdf/getQuotation"); // Adjust the URL to match your server route
      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob);
      setDataUrl(blobUrl);
      // To open in a new window
      // window.open(blobUrl, "_blank");
    });
  }

  const removeItem = (index) => {
    const updatedTestItems = [...formik.values.quotationItems];
    updatedTestItems.splice(index, 1);
    formik.setFieldValue("quotationItems", updatedTestItems);
  };
  const addItem = () => {
    formik.setFieldValue("quotationItems", [
      ...formik.values.quotationItems,
      { testDescription: "", quantity: "", unit: "", rate: "" },
    ]);
  };

  if (isPrefillLoading) {
    return <div>Loading...</div>;
  }
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
            <span className="text-lg font-medium text-gray-500 list-item col-span-2">
              Client Details
            </span>
            <div className="flex col-span-2 gap-2 justify-between">
              <div className="flex flex-col">
                <div className="w-48 flex flex-col">
                  <label className="text-xs text-gray-400">To*</label>
                  {/* TODO: Try to remove textarea and move everything to span using
                  contentEditable */}
                  {isEditMode ? (
                    <textarea
                      id="quotationTo"
                      className="outline-none border-2 rounded-lg p-2 w-96 col-span-2"
                      placeholder="eg. M/s Engg Research Labs"
                      onChange={formik.handleChange}
                      value={formik.values.quotationTo}
                      wrap="soft"
                    />
                  ) : (
                    <span
                      id="quotationTo"
                      className="outline-none rounded-lg p-2 w-96 col-span-2"
                    >
                      {formik.values.quotationTo}
                    </span>
                  )}
                </div>
                <div>
                  {formik.touched.quotationTo && formik.errors.quotationTo ? (
                    <div className="text-xs text-red-500 font-semibold">
                      {formik.errors.quotationTo}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="w-48 flex flex-col">
                  <label className="text-xs text-gray-400">
                    Date of Quotation*
                  </label>
                  {isEditMode ? (
                    <input
                      type="date"
                      id="dateOfQuotation"
                      className="outline-none border-2 rounded-lg p-2 col-span-2"
                      placeholder=""
                      onChange={formik.handleChange}
                      value={formik.values.dateOfQuotation}
                    />
                  ) : (
                    <span className="outline-none rounded-lg p-2 col-span-2">
                      {dayjs(formik.values.dateOfQuotation).format(
                        "DD/MM/YYYY"
                      )}
                    </span>
                  )}
                </div>
                <div>
                  {formik.touched.dateOfQuotation &&
                  formik.errors.dateOfQuotation ? (
                    <div className="text-xs text-red-500 font-semibold">
                      {formik.errors.dateOfQuotation}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="w-full col-span-2 flex flex-col">
                <label className="text-xs text-gray-400">Subject*</label>
                {isEditMode ? (
                  <input
                    id="subject"
                    className="outline-none border-2 rounded-lg p-2 col-span-2"
                    placeholder=""
                    onChange={formik.handleChange}
                    value={formik.values.subject}
                  />
                ) : (
                  <span>{formik.values.subject}</span>
                )}
              </div>
              <div>
                {formik.touched.subject && formik.errors.subject ? (
                  <div className="text-xs text-red-500 font-semibold">
                    {formik.errors.subject}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full col-span-2 flex flex-col">
              <label className="text-xs text-gray-400">Reference</label>
              {isEditMode ? (
                <input
                  id="reference"
                  className="outline-none border-2 rounded-lg p-2 col-span-2"
                  placeholder="eg. Phone call on July 10, 2023"
                  onChange={formik.handleChange}
                  value={formik.values.reference}
                />
              ) : (
                <span>{formik.values.reference}</span>
              )}
            </div>

            <span className="mt-4 text-lg font-medium text-gray-500 list-item col-span-2">
              Item Details
            </span>
            <div className="w-full flex flex-col lg:col-span-2">
              {formik.values.quotationItems.map((_, index) => (
                <div key={index} className="mt-4">
                  <div className="font-medium bg-slate-200">
                    Item {index + 1}:
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor={`quotationItems.${index}.testDescription`}
                      className="text-xs text-gray-400"
                    >
                      Test Desctiption*:
                    </label>
                    {isEditMode ? (
                      <textarea
                        className="outline-none border-2 rounded-lg p-2 w-full col-span-2 text-sm h-40"
                        id={`quotationItems.${index}.testDescription`}
                        name={`quotationItems.${index}.testDescription`}
                        onChange={formik.handleChange}
                        value={
                          formik.values.quotationItems[index].testDescription
                        }
                      />
                    ) : (
                      <span className="outline-none rounded-lg p-2 w-full col-span-2 text-sm">
                        {formik.values.quotationItems[index].testDescription}
                      </span>
                    )}

                    <div>
                      {formik.touched.quotationItems?.[index]
                        ?.testDescription &&
                      formik.errors.quotationItems?.[index][
                        "testDescription"
                      ] ? (
                        <div className="text-xs text-red-500 font-semibold">
                          {
                            formik.errors.quotationItems[index][
                              "testDescription"
                            ]
                          }
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex lg:col-span-2 gap-2 justify-between">
                    <div className="w-40 flex flex-col">
                      <label
                        htmlFor={`quotationItems.${index}.quantity`}
                        className="text-xs text-gray-400"
                      >
                        Quantity*
                      </label>
                      {isEditMode ? (
                        <input
                          className="outline-none border-2 rounded-lg p-2 w-full col-span-2"
                          id={`quotationItems.${index}.quantity`}
                          name={`quotationItems.${index}.quantity`}
                          type="number"
                          onChange={formik.handleChange}
                          value={formik.values.quotationItems[index].quantity}
                        />
                      ) : (
                        <span>
                          {formik.values.quotationItems[index].quantity}
                        </span>
                      )}

                      <div>
                        {formik.touched.quotationItems?.[index]?.quantity &&
                        formik.errors.quotationItems?.[index]["quantity"] ? (
                          <div className="text-xs text-red-500 font-semibold">
                            {formik.errors.quotationItems?.[index]["quantity"]}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-40 flex flex-col">
                      <label
                        htmlFor={`quotationItems.${index}.unit`}
                        className="text-xs text-gray-400"
                      >
                        Unit*
                      </label>
                      {isEditMode ? (
                        <input
                          className="outline-none border-2 rounded-lg p-2 w-full col-span-2"
                          id={`quotationItems.${index}.unit`}
                          name={`quotationItems.${index}.unit`}
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.quotationItems[index].unit}
                        />
                      ) : (
                        <span>{formik.values.quotationItems[index].unit}</span>
                      )}

                      <div>
                        {formik.touched.quotationItems?.[index]?.unit &&
                        formik.errors.quotationItems?.[index]["unit"] ? (
                          <div className="text-xs text-red-500 font-semibold">
                            {formik.errors.quotationItems?.[index]["unit"]}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="w-40 flex flex-col">
                      <label
                        htmlFor={`quotationItems.${index}.rate`}
                        className="text-xs text-gray-400"
                      >
                        Rate*
                      </label>
                      {isEditMode ? (
                        <input
                          className="outline-none border-2 rounded-lg p-2 w-full col-span-2"
                          id={`quotationItems.${index}.rate`}
                          name={`quotationItems.${index}.rate`}
                          type="number"
                          onChange={formik.handleChange}
                          value={formik.values.quotationItems[index].rate}
                        />
                      ) : (
                        <span>{formik.values.quotationItems[index].rate}</span>
                      )}

                      <div>
                        {formik.touched.quotationItems?.[index]?.rate &&
                        formik.errors.quotationItems?.[index]["rate"] ? (
                          <div className="text-xs text-red-500 font-semibold">
                            {formik.errors.quotationItems?.[index]["rate"]}
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
                className="w-24 mt-8 p-1 text-white bg-blue-400 rounded-lg"
              >
                Add Item
              </button>
            </div>
            <button type="submit">Add PT Record</button>
            <button onClick={downloadPdf}>Preview Pdf</button>
          </div>
          {/* // Preview starts here */}

          {!!dataUrl ? (
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
          )}
        </div>
      </form>
    </div>
  );
};

export default NewPoc;
