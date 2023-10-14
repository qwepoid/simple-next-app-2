const ClientSampleIdentifier = ({ isEditMode, formik, index }) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={`sampleDetails.${index}.`}
        className="text-xs text-gray-400"
      >
        Client Sample Identifier*:
      </label>
      {isEditMode ? (
        <input
          className="outline-none border-2 rounded-lg p-2  text-sm"
          id={`sampleDetails.${index}.clientSampleIdentifier`}
          name={`sampleDetails.${index}.clientSampleIdentifier`}
          onChange={formik.handleChange}
          value={formik.values.sampleDetails[index]?.clientSampleIdentifier}
        />
      ) : (
        <span className="outline-none rounded-lg p-2 text-sm">
          {formik.values.sampleDetails[index]?.clientSampleIdentifier}
        </span>
      )}

      <div>
        {formik.touched.sampleDetails?.[index]?.clientSampleIdentifier &&
        formik.errors.sampleDetails?.[index]?.clientSampleIdentifier ? (
          <div className="text-xs text-red-500 font-semibold">
            {formik.errors.sampleDetails[index]?.clientSampleIdentifier}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ClientSampleIdentifier;
