import WorkStatus from "./components/WorkStatus";
import TestedBy from "./components/TestedBy";
import ExpectedCompletionDate from "./components/ExpectedCompletionDate";
import Material from "./components/Material";
import TestParameter from "./components/TestParameter";
import TestMethod from "./components/TestMethod";

const DetailsSection = ({ isEditMode, formik }) => {
  return (
    <>
      <div className="w-full flex flex-col lg:col-span-2">
        <div className="mt-4">
          <div className="font-medium bg-slate-200 pl-4 py-1 rounded-md">
            Test Details:
          </div>
          <div className="flex lg:col-span-2 gap-2 justify-between">
            <Material formik={formik} />
            <TestParameter formik={formik} />
            <TestMethod formik={formik} />
          </div>

          <div className="font-medium bg-slate-200 pl-4 py-1 rounded-md">
            Status:
          </div>
          <div className="flex lg:col-span-2 gap-2 justify-between">
            {/* <StartDate isEditMode={isEditMode} formik={formik} /> */}
            <ExpectedCompletionDate isEditMode={isEditMode} formik={formik} />
            {/* <ActualCompletionDate isEditMode={isEditMode} formik={formik} /> */}
            <WorkStatus isEditMode={isEditMode} formik={formik} />
            <TestedBy isEditMode={isEditMode} formik={formik} />
          </div>

          <button>Submit for review</button>
        </div>
      </div>
    </>
  );
};

export default DetailsSection;
