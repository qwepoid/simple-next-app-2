const ActualCompletionDate = ({ isEditMode, formik }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={`actualCompletionDate`} className="text-xs text-gray-400">
        Actual Completion Date*:
      </label>
      {isEditMode ? (
        <input
          className="outline-none border-2 rounded-lg p-2  text-sm"
          id="actualCompletionDate"
          name="actualCompletionDate"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.actualCompletionDate}
        />
      ) : (
        <span className="outline-none rounded-lg p-2 text-sm">
          {formik.values.actualCompletionDate}
        </span>
      )}

      <div>
        {formik.touched.actualCompletionDate &&
        formik.errors.actualCompletionDate ? (
          <div className="text-xs text-red-500 font-semibold">
            {formik.errors.actualCompletionDate}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ActualCompletionDate;
