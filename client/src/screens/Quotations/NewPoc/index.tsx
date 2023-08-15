import { useFormik } from "formik";
import { useState } from "react";
import { FormikErrors } from "./types";
import { formikValidator, initialValues } from "./formikUtils";
import useAddNewQuotation from "../custom-hooks/useAddNewQuotation";

const NewPoc = () => {
  const { data, addNewQuotation, isLoading, error } = useAddNewQuotation();
  const formik = useFormik({
    initialValues: initialValues,
    validate: (values): FormikErrors => formikValidator(values),
    onSubmit: (values) => {
      // const payload = JSON.stringify(values);
      alert(JSON.stringify(values, null, 2));
      addNewQuotation(values);
      // downloadPdf();
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
  return (
    <div className="mt-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col lg:grid lg:grid-cols-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:col-span-2 gap-4">
            <span className="mt-4 text-lg font-medium text-gray-500 list-item col-span-2">
              Client Details
            </span>
            <div className="flex col-span-2 gap-2 justify-between">
              <div className="flex flex-col">
                <div className="w-48 flex flex-col">
                  <label className="text-xs text-gray-400">To*</label>
                  <textarea
                    id="quotationTo"
                    className="outline-none border-2 rounded-lg p-2 w-96 col-span-2"
                    placeholder="eg. M/s Engg Research Labs"
                    onChange={formik.handleChange}
                    value={formik.values.quotationTo}
                    wrap="soft"
                  />
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
                  <input
                    type="date"
                    id="dateOfQuotation"
                    className="outline-none border-2 rounded-lg p-2 col-span-2"
                    placeholder=""
                    onChange={formik.handleChange}
                    value={formik.values.dateOfQuotation}
                  />
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
                <input
                  id="subject"
                  className="outline-none border-2 rounded-lg p-2 col-span-2"
                  placeholder=""
                  onChange={formik.handleChange}
                  value={formik.values.subject}
                />
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
              <input
                id="reference"
                className="outline-none border-2 rounded-lg p-2 col-span-2"
                placeholder="eg. Phone call on July 10, 2023"
                onChange={formik.handleChange}
                value={formik.values.reference}
              />
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
                    <textarea
                      className="outline-none border-2 rounded-lg p-2 w-full col-span-2 text-sm h-40"
                      id={`quotationItems.${index}.testDescription`}
                      name={`quotationItems.${index}.testDescription`}
                      onChange={formik.handleChange}
                      value={
                        formik.values.quotationItems[index].testDescription
                      }
                    />
                    <div>
                      {formik.touched.quotationItems?.[index]
                        ?.testDescription &&
                      formik.errors.quotationItems?.[index]?.testDescription ? (
                        <div className="text-xs text-red-500 font-semibold">
                          {formik.errors.quotationItems[index]?.testDescription}
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
                      <input
                        className="outline-none border-2 rounded-lg p-2 w-full col-span-2"
                        id={`quotationItems.${index}.quantity`}
                        name={`quotationItems.${index}.quantity`}
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.quotationItems[index].quantity}
                      />
                      <div>
                        {formik.touched.quotationItems?.[index]?.quantity &&
                        formik.errors.quotationItems?.[index]?.quantity ? (
                          <div className="text-xs text-red-500 font-semibold">
                            {formik.errors.quotationItems?.[index]?.quantity}
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
                      <input
                        className="outline-none border-2 rounded-lg p-2 w-full col-span-2"
                        id={`quotationItems.${index}.unit`}
                        name={`quotationItems.${index}.unit`}
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.quotationItems[index].unit}
                      />
                      <div>
                        {formik.touched.quotationItems?.[index]?.unit &&
                        formik.errors.quotationItems?.[index]?.unit ? (
                          <div className="text-xs text-red-500 font-semibold">
                            {formik.errors.quotationItems?.[index]?.unit}
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
                      <input
                        className="outline-none border-2 rounded-lg p-2 w-full col-span-2"
                        id={`quotationItems.${index}.rate`}
                        name={`quotationItems.${index}.rate`}
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.quotationItems[index].rate}
                      />
                      <div>
                        {formik.touched.quotationItems?.[index]?.rate &&
                        formik.errors.quotationItems?.[index]?.rate ? (
                          <div className="text-xs text-red-500 font-semibold">
                            {formik.errors.quotationItems?.[index]?.rate}
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
