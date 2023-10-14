const SampleLocation = ({ isEditMode, formik, index }) => {
  return (
    <div className="w-40 flex flex-col">
      <label
        htmlFor={`sampleDetails.${index}.samplingLocation`}
        className="text-xs text-gray-400"
      >
        Sampling Location*
      </label>
      {isEditMode ? (
        <input
          className="outline-none border-2 rounded-lg p-2 w-full col-span-2"
          id={`sampleDetails.${index}.samplingLocation`}
          name={`sampleDetails.${index}.samplingLocation`}
          type="text"
          onChange={formik.handleChange}
          value={formik.values.sampleDetails[index]?.samplingLocation}
        />
      ) : (
        <span>{formik.values.sampleDetails[index]?.samplingLocation}</span>
      )}

      <div>
        {formik.touched.sampleDetails?.[index]?.samplingLocation &&
        formik.errors.sampleDetails?.[index]?.samplingLocation ? (
          <div className="text-xs text-red-500 font-semibold">
            {formik.errors.sampleDetails?.[index]?.samplingLocation}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SampleLocation;
