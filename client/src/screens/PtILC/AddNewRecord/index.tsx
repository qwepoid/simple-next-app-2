import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Chip from "../../../components/Chip";
import { generateParametersChips } from "./utils";
import useGetTestParameters from "../service-hooks/useGetTestParameters";

const AddNewRecord = () => {
  /**
   * TODO:
   * 1. Add length validations on text inputs
   * 2. Add date validations
   * 3. Move input and label into a common components folder
   */

  const formik = useFormik({
    initialValues: {
      material: "select",
      discipline: "select",
      ptProvider: "",
      uniqueId: "",
      dateOfPt: "",
      testParameters: [],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [dataUrl, setDataUrl] = useState("");

  function handleFileUpload(e) {
    let files = e.target.files[0];
    setDataUrl(URL.createObjectURL(files));
  }

  function shouldBeDisabled() {
    return Boolean(
      !formik.values.material ||
        formik.values.material === "select" ||
        !formik.values.discipline ||
        formik.values.discipline === "select" ||
        !formik.values.ptProvider ||
        !formik.values.uniqueId ||
        !formik.values.dateOfPt ||
        !formik.values.testParameters.length
    );
  }
  const isDisabled = shouldBeDisabled();
  const { data: paramters, getRecords } = useGetTestParameters();

  useEffect(() => {
    formik.values.testParameters = [];
    if (formik.values.material.length) getRecords(formik.values.material);
  }, [formik.values.material]);

  function handleParameterSelection(idx) {
    let selectedParameter = paramters[idx];
    if (formik.values.testParameters.includes(selectedParameter)) {
      formik.values.testParameters = formik.values.testParameters.filter(
        (param) => param != selectedParameter
      );
      return;
    }
    formik.values.testParameters.push(paramters[idx]);
  }

  return (
    <div className="mt-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col lg:grid lg:grid-cols-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:col-span-2 gap-4">
            <span className="mt-4 text-lg font-medium text-gray-500 list-item col-span-2">
              Parameter Details
            </span>
            <div className="w-48 flex flex-col">
              <label className="text-xs text-gray-400">Material</label>
              <select
                id="material"
                className="outline-none border rounded-lg p-2 focus:border-blue-500"
                onChange={formik.handleChange}
                value={formik.values.material}
              >
                <option selected disabled hidden value="select">
                  Select
                </option>
                <option value="Micro Silica / Silica Fumes">
                  Micro Silica / Silica Fumes
                </option>
                <option value="Cement">Cement</option>
                <option value="Paver Block">Paver Block</option>
              </select>
            </div>
            <div className="w-48 flex flex-col">
              <label className="text-xs text-gray-400">Discipline</label>
              <select
                id="discipline"
                value={formik.values.discipline}
                onChange={formik.handleChange}
                className="outline-none border rounded-lg p-2 focus:border-blue-500"
              >
                <option selected disabled hidden value="select">
                  Select
                </option>
                <option value="Mechanical">Mechanical</option>
                <option value="Chemical">Chemical</option>
                <option value="NDT">NDT</option>
              </select>
            </div>
            <div className="lg:col-span-2 flex-wrap flex w-auto">
              <label className="text-xs text-gray-400">Test Parameters*</label>
              <Chip
                key={formik.values.material}
                items={generateParametersChips(
                  paramters,
                  handleParameterSelection
                )}
                showCount={false}
                multiSelect
              />
            </div>
            <span className="mt-4 text-lg font-medium text-gray-500 list-item col-span-2">
              PT Provider Details
            </span>
            <div className="w-96 flex flex-col lg:col-span-2">
              <label className="text-xs text-gray-400">PT Provider*</label>
              <input
                id="ptProvider"
                className="outline-none border-2 rounded-lg p-2 w-96 col-span-2"
                placeholder="TC-XXXX-XXXX-XXXX*"
                onChange={formik.handleChange}
                value={formik.values.ptProvider}
              />
            </div>
            <div className="w-96 flex flex-col">
              <label className="text-xs text-gray-400">Unique Id*</label>
              <input
                id="uniqueId"
                type="text"
                className="outline-none border-2 rounded-lg p-2 mr-2 w-48"
                onChange={formik.handleChange}
                value={formik.values.uniqueId}
              />
            </div>
            <div className="w-96 flex flex-col">
              <label className="text-xs text-gray-400">Date of PT*</label>
              <input
                id="dateOfPt"
                type="date"
                className="outline-none border-2 rounded-lg p-2 ml-2 w-48"
                onChange={formik.handleChange}
                value={formik.values.dateOfPt}
              />
            </div>
            <div className="w-96 flex flex-col">
              <label className="text-xs text-gray-400 mb-2">
                Upload PT Certificate*
              </label>
              <input type="file" onChange={handleFileUpload} />
            </div>
            <button
              className={`p-2 rounded-lg col-span-2 w-40 place-self-center mb-10 ${
                isDisabled
                  ? "bg-gray-100 text-gray-400 font-medium border-gray-900 border-b"
                  : "bg-blue-500 text-white"
              }`}
              disabled={isDisabled}
            >
              Add PT Record
            </button>
          </div>
          <div className="sm:hidden lg:block lg:grid lg:col-span-2">
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
        </div>
      </form>
    </div>
  );
};

export default AddNewRecord;
