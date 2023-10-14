import { JobStatus } from "../types";

const WorkStatus = ({ isEditMode, formik }) => {
  const currentState = formik.values.status;

  function handleStateChange(e) {
    const jobStatus = e.target.value;
    formik.setFieldValue("status", jobStatus);
    if (jobStatus === JobStatus.IN_PROGRESS) {
      formik.setFieldValue("startDate", new Date());
    }
  }

  return (
    <div className="flex flex-col">
      <label htmlFor={`status`} className="text-xs text-gray-400">
        Work Status*:
      </label>
      {isEditMode ? (
        <select
          id="status"
          name="status"
          disabled={!isEditMode}
          className={`outline rounded-lg text-white p-2 ${
            currentState == 0
              ? "bg-red-500"
              : currentState == 1
              ? "bg-blue-500"
              : "bg-green-500"
          }`}
          value={currentState}
          onChange={handleStateChange}
        >
          <option value={0}>Not started</option>
          <option value={1}>In Progress</option>
          <option value={2}>Completed</option>
        </select>
      ) : (
        <span
          className={`outline-none rounded-lg p-2 text-sm ${
            currentState == 0
              ? "bg-red-500 text-white"
              : currentState == 1
              ? "bg-blue-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {JobStatus[formik.values.status]?.replaceAll("_", " ")}
        </span>
      )}

      <div>
        {formik.touched.status && formik.errors.status ? (
          <div className="text-xs text-red-500 font-semibold">
            {formik.errors.status}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WorkStatus;
