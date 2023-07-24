import { useFormik } from "formik";
import { useState } from "react";

const NewRecord = () => {
  /**
   * TODO:
   * 1. Add length validations on text inputs
   * 2. Add date validations
   * 3. Add ULR regex validation
   * 4. Move input and label into a common components folder
   */

  const formik = useFormik({
    initialValues: {
      equipmentName: "",
      range: "",
      leastCount: "",
      section: "",
      ulr: "",
      calibrationBy: "",
      calibrationFrom: "",
      calibrationTo: "",
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
  return (
    <div className="mt-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col lg:grid lg:grid-cols-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:col-span-2 gap-4">
            <span className="mt-4 text-lg font-medium text-gray-500 list-item col-span-2">
              Equipment Details
            </span>
            <div className="w-96 flex flex-col lg:col-span-2">
              <label className="text-xs text-gray-400">Equipment Name</label>
              <input
                id="equipmentName"
                className="outline-none border-2 rounded-lg p-2"
                placeholder="eg. CBR Machine"
                onChange={formik.handleChange}
                value={formik.values.equipmentName}
              />
            </div>
            <div className="w-96 flex flex-col">
              <label className="text-xs text-gray-400">Range of Testing</label>
              <input
                id="range"
                className="outline-none border-2 rounded-lg p-2 w-48"
                placeholder="eg. 1mm to 20mm"
                onChange={formik.handleChange}
                value={formik.values.range}
              />
            </div>
            <div className="w-96 flex flex-col">
              <label className="text-xs text-gray-400">Least Count</label>
              <input
                id="leastCount"
                className="outline-none border-2 rounded-lg p-2 w-48"
                placeholder="eg. 0.002mm"
                onChange={formik.handleChange}
                value={formik.values.leastCount}
              />
            </div>
            <div className="w-96 flex flex-col">
              <label className="text-xs text-gray-400">Section</label>
              <input
                id="section"
                className="outline-none border-2 rounded-lg p-2 w-96"
                placeholder="eg. Soil"
                onChange={formik.handleChange}
                value={formik.values.section}
              />
            </div>
            <span className="mt-4 text-lg font-medium text-gray-500 list-item col-span-2">
              Calibration Details
            </span>
            <div className="w-96 flex flex-col lg:col-span-2">
              <label className="text-xs text-gray-400">
                ULR / Certificate No.*
              </label>
              <input
                id="ulr"
                className="outline-none border-2 rounded-lg p-2 w-96 col-span-2"
                placeholder="TC-XXXX-XXXX-XXXX*"
                onChange={formik.handleChange}
                value={formik.values.ulr}
              />
            </div>
            <div className="w-96 flex flex-col lg:col-span-2">
              <label className="text-xs text-gray-400">
                Calibrating Agency*
              </label>
              <input
                id="calibrationBy"
                className="outline-none border-2 rounded-lg p-2 w-96 col-span-2"
                placeholder="eg. DVG Labs"
                onChange={formik.handleChange}
                value={formik.values.calibrationBy}
              />
            </div>
            <div className="w-96 flex flex-col">
              <label className="text-xs text-gray-400">
                Calibration Valid From*
              </label>
              <input
                id="calibrationFrom"
                type="date"
                className="outline-none border-2 rounded-lg p-2 mr-2 w-48"
                onChange={formik.handleChange}
                value={formik.values.calibrationFrom}
              />
            </div>
            <div className="w-96 flex flex-col">
              <label className="text-xs text-gray-400">
                Calibration Valid Till*
              </label>
              <input
                id="calibrationTo"
                type="date"
                className="outline-none border-2 rounded-lg p-2 ml-2 w-48"
                onChange={formik.handleChange}
                value={formik.values.calibrationTo}
              />
            </div>
            <div className="w-96 flex flex-col">
              <label className="text-xs text-gray-400 mb-2">
                Upload Calibration Certificate*
              </label>
              <input type="file" onChange={handleFileUpload} />
            </div>
            <button className="bg-blue-500 text-white p-2 rounded-lg col-span-2 w-40 place-self-center mb-10">
              Add equipment
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

export default NewRecord;
