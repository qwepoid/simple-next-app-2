const TestedBy = ({ isEditMode, formik }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={`testedBy`} className="text-xs text-gray-400">
        Tested By*:
      </label>
      {isEditMode ? (
        <input
          type="text"
          id="testedBy"
          name="testedBy"
          disabled={!isEditMode}
          className={`outline-none border-2 rounded-lg p-2  text-sm`}
          value={formik.values.testedBy}
          onChange={formik.handleChange}
        />
      ) : (
        <span className="outline-none rounded-lg p-2 text-sm">
          {formik.values.testedBy}
        </span>
      )}

      <div>
        {formik.touched.testedBy && formik.errors.testedBy ? (
          <div className="text-xs text-red-500 font-semibold">
            {formik.errors.testedBy}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TestedBy;
