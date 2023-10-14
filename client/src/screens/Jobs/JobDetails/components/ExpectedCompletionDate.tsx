const ExpectedCompletionDate = ({ isEditMode, formik }) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={`expectedCompletionDate`}
        className="text-xs text-gray-400"
      >
        Expected Completion Date*:
      </label>
      {isEditMode ? (
        <input
          className="outline-none border-2 rounded-lg p-2  text-sm"
          id="expectedCompletionDate"
          name="expectedCompletionDate"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.expectedCompletionDate}
        />
      ) : (
        <span className="outline-none rounded-lg p-2 text-sm">
          {formik.values.expectedCompletionDate}
        </span>
      )}

      <div>
        {formik.touched.expectedCompletionDate &&
        formik.errors.expectedCompletionDate ? (
          <div className="text-xs text-red-500 font-semibold">
            {formik.errors.expectedCompletionDate}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ExpectedCompletionDate;
