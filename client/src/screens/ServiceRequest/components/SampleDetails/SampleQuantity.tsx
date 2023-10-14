const SampleQuantity = ({ isEditMode, formik, index }) => {
  return (
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
          value={formik.values.sampleDetails[index]?.quantity}
        />
      ) : (
        <span>{formik.values.sampleDetails[index]?.quantity}</span>
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
  );
};

export default SampleQuantity;
