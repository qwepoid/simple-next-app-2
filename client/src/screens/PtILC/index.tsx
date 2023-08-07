import AwaitedPT from "./AwaitedPT";
import RecordsPT from "./RecordsPT";
import { useState } from "react";
import { useRouter } from "next/router";
import useGetPtRecords from "./service-hooks/useGetPtRecords";

const PtILC = () => {
  const { data, refetchPtRecords } = useGetPtRecords();
  const [currentSelection, setCurrentSelection] = useState(0);
  const [addNewEntry, setAddNewEntry] = useState(false);
  const router = useRouter();

  function handleAddNewRecord() {
    setAddNewEntry((old) => !old);
    router.push("pt-ilc/new");
  }

  function handleDeleteInChild() {
    refetchPtRecords();
  }

  return (
    <div>
      <div className="grid grid-cols-10">
        <div className="col-span-2 flex flex-col mr-8 mt-8">
          <div
            className={`p-2 cursor-pointer border border-black text-center font-bold rounded-t-sm bg-sky-100 ${
              !currentSelection && "bg-sky-200"
            }`}
            onClick={() => setCurrentSelection(0)}
          >
            PT
          </div>
          <div
            className={`p-2 cursor-pointer border border-black text-center font-bold rounded-b-sm bg-sky-100 ${
              currentSelection && "bg-sky-200"
            }`}
            onClick={() => setCurrentSelection(1)}
          >
            ILC
          </div>
        </div>

        <div className="col-span-8">
          <div className="border-b-2 border-b-black pb-2 flex justify-between mb-8">
            <span className="text-xl font-bold ">
              {currentSelection
                ? "Inter-Lab Comparison (ILC)"
                : "Proficiency Testing (PT)"}
            </span>
            <button
              className="text-blue-500 underline"
              onClick={handleAddNewRecord}
            >
              Add new Record
            </button>
          </div>

          <AwaitedPT />
          <br />
          <RecordsPT
            addNewEntry={addNewEntry}
            records={data}
            onDeleteRecord={handleDeleteInChild}
          />
        </div>
      </div>
    </div>
  );
};

export default PtILC;
