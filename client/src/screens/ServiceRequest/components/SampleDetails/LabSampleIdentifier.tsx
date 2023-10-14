const LabSampleIdentifier = ({ isEditMode, formik, index }) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={`sampleDetails.${index}.labSampleIdentifier`}
        className="text-xs text-gray-400"
      >
        LAB Sample Identifier*:
      </label>
      {isEditMode ? (
        <input
          className="
                        outline-none border-2 rounded-lg p-2  text-sm"
          id={`sampleDetails.${index}.labSampleIdentifier`}
          name={`sampleDetails.${index}.labSampleIdentifier`}
          onChange={formik.handleChange}
          value={formik.values.sampleDetails[index]?.labSampleIdentifier}
        />
      ) : (
        <span className="outline-none rounded-lg p-2 text-sm">
          {formik.values.sampleDetails[index]?.labSampleIdentifier}
        </span>
      )}

      <div>
        {formik.touched.sampleDetails?.[index]?.labSampleIdentifier &&
        formik.errors.sampleDetails?.[index]?.labSampleIdentifier ? (
          <div className="text-xs text-red-500 font-semibold">
            {formik.errors.sampleDetails[index]?.labSampleIdentifier}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LabSampleIdentifier;
