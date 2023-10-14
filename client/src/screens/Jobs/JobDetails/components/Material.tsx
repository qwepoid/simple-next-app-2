const Material = ({ formik }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={`material`} className="text-xs text-gray-400">
        Material*:
      </label>

      <span className="outline-none rounded-lg p-2 text-sm">
        {formik.values.material}
      </span>
    </div>
  );
};

export default Material;
