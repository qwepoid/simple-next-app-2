import SampleDescription from "./SampleDetails/SampleDescription";
import SampleQuantity from "./SampleDetails/SampleQuantity";
import SampleLocation from "./SampleDetails/SampleLocation";
import TestParameters from "./SampleDetails/TestParameters";
import ClientSampleIdentifier from "./SampleDetails/ClientSampleIdentifier";
import LabSampleIdentifier from "./SampleDetails/LabSampleIdentifier";

const SampleDetailsSections = ({ isEditMode, formik }) => {
  const addItem = () => {
    formik.setFieldValue("sampleDetails", [
      ...formik.values.sampleDetails,
      {
        sampleDescription: "",
        samplingLocation: "",
        testParameters: [
          {
            parameter: "",
            code: "",
          },
        ],
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

  return (
    <>
      <span className="mt-4 text-lg font-medium text-gray-500 list-item col-span-2">
        Sample Details
      </span>
      <div className="w-full flex flex-col lg:col-span-2">
        {formik.values.sampleDetails.map((_, index) => (
          <div key={index} className="mt-4">
            <div className="font-medium bg-slate-200 pl-4 py-1 rounded-md">
              Material {index + 1}:
            </div>
            <div className="flex lg:col-span-2 gap-2 justify-between">
              <SampleDescription
                isEditMode={isEditMode}
                formik={formik}
                index={index}
              />
              <ClientSampleIdentifier
                isEditMode={isEditMode}
                formik={formik}
                index={index}
              />
              <LabSampleIdentifier
                isEditMode={isEditMode}
                formik={formik}
                index={index}
              />
            </div>
            <div className="flex lg:col-span-2 gap-2 justify-between">
              <SampleQuantity
                isEditMode={isEditMode}
                formik={formik}
                index={index}
              />
              <SampleLocation
                isEditMode={isEditMode}
                formik={formik}
                index={index}
              />
            </div>
            <div className="flex lg:col-span-2 gap-2 justify-between">
              <TestParameters
                isEditMode={isEditMode}
                formik={formik}
                index={index}
              />
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
    </>
  );
};

export default SampleDetailsSections;
