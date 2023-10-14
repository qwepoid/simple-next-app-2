const ClientRepSection = ({ isEditMode, formik }) => {
  return (
    <>
      <span className="text-lg font-medium text-gray-500 list-item col-span-2">
        Customer Representative Details
      </span>
      <div className="flex col-span-2 gap-2 justify-between">
        <div className="flex flex-col">
          <div className="w-48 flex flex-col">
            <label className="text-xs text-gray-400">
              Representative Name*
            </label>
            {/* TODO: Try to remove textarea and move everything to span using
                  contentEditable */}
            {isEditMode ? (
              <input
                id={`customerDetails.customerRepName`}
                className="outline-none border-2 rounded-lg p-2 col-span-2"
                placeholder="eg. Naresh Gupta"
                onChange={formik.handleChange}
                value={formik.values.customerDetails?.customerRepName}
              />
            ) : (
              <span
                id="quotationTo"
                className="outline-none rounded-lg p-2 w-96 col-span-2"
              >
                {formik.values.customerDetails?.customerRepName}
              </span>
            )}
          </div>
          <div>
            {formik.touched.customerDetails?.customerRepName &&
            formik.errors.customerDetails?.customerRepName ? (
              <div className="text-xs text-red-500 font-semibold">
                {formik.errors.customerDetails?.customerRepName}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-48 flex flex-col">
            <label className="text-xs text-gray-400">
              Representative Phone No. *
            </label>
            {/* TODO: Try to remove textarea and move everything to span using
                  contentEditable */}
            {isEditMode ? (
              <input
                id={`customerDetails.customerRepPhone`}
                className="outline-none border-2 rounded-lg p-2 col-span-2"
                placeholder="9XXXXXXXXX"
                maxLength={10}
                onChange={formik.handleChange}
                value={formik.values.customerDetails?.customerRepPhone}
              />
            ) : (
              <span
                id="quotationTo"
                className="outline-none rounded-lg p-2 w-96 col-span-2"
              >
                {formik.values.customerDetails?.customerRepPhone}
              </span>
            )}
          </div>
          <div>
            {formik.touched.customerDetails?.customerRepPhone &&
            formik.errors.customerDetails?.customerRepPhone ? (
              <div className="text-xs text-red-500 font-semibold">
                {formik.errors.customerDetails?.customerRepPhone}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientRepSection;
