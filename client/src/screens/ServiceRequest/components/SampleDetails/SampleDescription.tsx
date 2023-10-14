const SampleDescription = ({ isEditMode, formik, index }) => {
  return (
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
          value={formik.values.sampleDetails[index]?.sampleDescription}
        />
      ) : (
        <span className="outline-none rounded-lg p-2 text-sm">
          {formik.values.sampleDetails[index]?.sampleDescription}
        </span>
      )}

      <div>
        {formik.touched.sampleDetails?.[index]?.sampleDescription &&
        formik.errors.sampleDetails?.[index]?.sampleDescription ? (
          <div className="text-xs text-red-500 font-semibold">
            {formik.errors.sampleDetails[index]?.sampleDescription}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SampleDescription;
