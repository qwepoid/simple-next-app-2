const TestMethod = ({ formik }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={`testMethod`} className="text-xs text-gray-400">
        Test Method*:
      </label>

      <span className="outline-none rounded-lg p-2 text-sm">
        {formik.values.testMethod}
      </span>
    </div>
  );
};

export default TestMethod;
