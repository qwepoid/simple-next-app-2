import dayjs from "dayjs";

const ClientDetailsSection = ({ isEditMode, formik }) => {
  return (
    <>
      <span className="text-lg font-medium text-gray-500 list-item col-span-2">
        Client Details
      </span>
      <div className="flex col-span-2 gap-2 justify-between">
        <div className="flex flex-col">
          <div className="w-48 flex flex-col">
            <label className="text-xs text-gray-400">
              Customer Name & Address*
            </label>
            {/* TODO: Try to remove textarea and move everything to span using
                      contentEditable */}
            {isEditMode ? (
              <textarea
                id={`customerDetails.customerNameAddress`}
                className="outline-none border-2 rounded-lg p-2 w-96 col-span-2"
                placeholder="eg. M/s Engg Research Labs"
                onChange={formik?.handleChange}
                value={formik?.values?.customerDetails?.customerNameAddress}
                wrap="soft"
              />
            ) : (
              <span
                id={`customerDetails.customerNameAddress`}
                className="outline-none rounded-lg p-2 w-96 col-span-2"
              >
                {formik?.values?.customerDetails?.customerNameAddress}
              </span>
            )}
          </div>
          <div>
            {formik?.touched?.customerDetails?.customerNameAddress &&
            formik?.errors?.customerDetails?.customerNameAddress ? (
              <div className="text-xs text-red-500 font-semibold">
                {formik?.errors?.customerDetails?.customerNameAddress}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="w-48 flex flex-col">
            <label className="text-xs text-gray-400">Date of SR*</label>
            {isEditMode ? (
              <input
                type="date"
                id="dateOfSR"
                className="outline-none border-2 rounded-lg p-2 col-span-2"
                placeholder=""
                onChange={formik?.handleChange}
                value={formik?.values?.dateOfSR}
              />
            ) : (
              <span className="outline-none rounded-lg p-2 col-span-2">
                {dayjs(formik?.values?.dateOfSR).format("DD/MM/YYYY")}
              </span>
            )}
          </div>
          <div>
            {formik?.touched?.dateOfSR && formik?.errors?.dateOfSR ? (
              <div className="text-xs text-red-500 font-semibold">
                {formik?.errors?.dateOfSR}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientDetailsSection;
