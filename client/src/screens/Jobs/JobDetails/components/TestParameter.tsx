const TestParameter = ({ formik }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={`testParameter`} className="text-xs text-gray-400">
        Test Parameter*:
      </label>

      <span className="outline-none rounded-lg p-2 text-sm">
        {formik.values.testParameter}
      </span>
    </div>
  );
};

export default TestParameter;
