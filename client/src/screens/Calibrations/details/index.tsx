import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DetailItem from "./DetailItem";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../../firebaseConfig";
import useGetEquipmentDetails from "../service-hooks/useGetEquipmentDetails";

const CalibrationDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log("page Id is: ", id);
  const [isEditMode, setEditMode] = useState(false);

  function getButtonName() {
    return isEditMode ? "Save" : "Update";
  }

  const { equipmentData } = useGetEquipmentDetails({ equipmentId: id });

  function handleEditData() {
    if (isEditMode) {
      // save data
    }
    setEditMode((isEditMode) => !isEditMode);
  }
  const fileRef = ref(storage, "calibrations/obnoxious.pdf");

  const [dUrl, setDurl] = useState("");

  useEffect(() => {
    getDownloadURL(fileRef).then((url) => {
      setDurl(url);
    });
  }, []);

  if (!equipmentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen">
      <div className="border-b-2 border-b-black pb-2 flex justify-between mb-8">
        <span className="text-xl font-bold ">{equipmentData.equipName}</span>
      </div>
      <div className="w-1/2 float-left pr-2">
        <DetailItem
          isEditMode={isEditMode}
          title="Equipment Name"
          value={equipmentData.equipName.toLowerCase()}
        />
        <DetailItem
          isEditable
          isEditMode={isEditMode}
          title="ULR No"
          value={equipmentData.ulr || "---"}
        />
        <DetailItem
          isEditable
          isDate
          isEditMode={isEditMode}
          title="Last Calibrated on"
          value={equipmentData.calibrationFrom}
        />
        <DetailItem
          isEditable
          isDate
          isEditMode={isEditMode}
          title="Expiring on"
          value={equipmentData.calibrationTo}
        />
        <DetailItem
          isEditable
          isEditMode={isEditMode}
          title="Calibrated by"
          value={equipmentData.calibrationBy.toLowerCase()}
        />
        {isEditMode && (
          <button className="flex border w-full justify-center rounded-lg px-2 py-1 text-white bg-blue-500 my-2">
            <input type="file" className="absolute opacity-0 w-full" />
            <span className="">Upload PDF</span>
          </button>
        )}
        <div className="flex justify-center gap-2 mt-4">
          <button
            className={`border px-2 py-1 rounded-xl text-white ${
              isEditMode ? "bg-green-500" : "bg-blue-500"
            }`}
            onClick={handleEditData}
          >
            {getButtonName()}
          </button>
          {isEditMode && (
            <button
              className="border border-gray-500 px-2 rounded-xl"
              onClick={handleEditData}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      <object
        data={dUrl + "#toolbar=0"}
        type="application/pdf"
        width="50%"
        height="100%"
        className="hidden lg:block"
      >
        <p>
          Alternative text - include a link <a href={dUrl}>to the PDF!</a>
        </p>
      </object>
    </div>
  );
};

export default CalibrationDetails;
