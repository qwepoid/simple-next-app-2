const StartDate = ({ isEditMode, formik }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={`startDate`} className="text-xs text-gray-400">
        Start Date*:
      </label>
      {isEditMode ? (
        <input
          className="outline-none border-2 rounded-lg p-2  text-sm"
          id="startDate"
          name="startDate"
          type="date"
          onChange={formik.handleChange}
          value={formik.values.startDate}
        />
      ) : (
        <span className="outline-none rounded-lg p-2 text-sm">
          {formik.values.startDate}
        </span>
      )}

      <div>
        {formik.touched.startDate && formik.errors.startDate ? (
          <div className="text-xs text-red-500 font-semibold">
            {formik.errors.startDate}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StartDate;
