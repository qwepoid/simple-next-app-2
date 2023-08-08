import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { useRef, useState } from "react";
import { handleFileDownload, sortByDate } from "./utils";
import Image from "next/image";
import Delete from "../../../public/delete.svg";
import Edit from "../../../public/edit.svg";
import useDeletePtRecord from "./service-hooks/useDeletePtRecord";
import Popup from "../../components/Popup";

const RecordsPT = ({ addNewEntry = false, records, onDeleteRecord }) => {
  const inputRef = useRef(null);
  const { deleteRecord } = useDeletePtRecord();
  const [deletionId, setDeletionId] = useState(null);

  function handleUploadClick() {
    inputRef.current.click();
  }

  if (records) {
    records?.sort(sortByDate);
  }

  function handleDelete(id) {
    deleteRecord({ id }).then(() => {
      setDeletionId(null);
      onDeleteRecord();
    });
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    const storageRef = ref(storage, "pt/2023/abc.pdf");
    debugger;
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("success");
      })
      .catch((err) => console.log("failure"));
  }
  return (
    <>
      <Popup
        title="Confirm Delete?"
        onClose={() => setDeletionId(null)}
        open={deletionId}
        message="Are you sure you want to delete this record?"
        onConfirm={() => handleDelete(deletionId)}
      />
      <div className="mb-4 font-bold underline text-stone-600 text-xl">
        Records
      </div>
      <table>
        <tr>
          <th className="p-2 border">S.No.</th>
          <th className="p-2 border">Agency</th>
          <th className="p-2 border">Ref. No</th>
          <th className="p-2 border">Date</th>
          <th className="p-2 border">Discipline</th>
          <th className="p-2 border">Material</th>
          <th className="p-2 border">Report</th>
          <th className="p-2 border">Actions</th>
        </tr>
        {addNewEntry && (
          <>
            <tr>
              <th className="p-2 border"></th>
              <th className="border">
                <input
                  placeholder="Agency"
                  className="p-2 outline-none font-light"
                />
              </th>
              <th className="border">
                <input
                  placeholder="Ref No."
                  className="p-2 outline-none font-light"
                />
              </th>
              <th className="border">
                <input
                  placeholder="Discipline"
                  className="p-2 outline-none font-light"
                />
              </th>
              <th className="border">
                <input
                  placeholder="Material"
                  className="p-2 outline-none font-light"
                />
              </th>
              <th className="border relative">
                <button
                  className="relative bg-blue-200"
                  onClick={handleUploadClick}
                >
                  Upload
                  <input
                    type="file"
                    ref={inputRef}
                    className="absolute left-0 hidden"
                    onChange={handleFileUpload}
                  />
                </button>
              </th>
            </tr>
            <button>Submit</button>
          </>
        )}
        {records?.map(
          ({ ptProvider, ref, discipline, material, _id, dateOfPt }, index) => (
            <tr>
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{ptProvider}</td>
              <td className="p-2 border">{ref}</td>
              <td className="p-2 border">
                {new Date(dateOfPt).toLocaleDateString()}
              </td>
              <td className="p-2 border">{discipline}</td>
              <td className="p-2 border">{material}</td>
              <td className="p-2 border text-center">
                <div
                  className="text-center text-blue-500 underline cursor-pointer"
                  onClick={() => handleFileDownload(ref)}
                >
                  Download
                </div>
              </td>
              <td className="p-2 border text-center flex items-center justify-center">
                <Image
                  className="cursor-pointer hover:scale-110"
                  height={20}
                  width={20}
                  src={Edit}
                  onClick={() => {}}
                />
                <Image
                  className="cursor-pointer hover:scale-110"
                  height={24}
                  width={24}
                  src={Delete}
                  onClick={() => setDeletionId(_id)}
                />
              </td>
            </tr>
          )
        )}
      </table>
    </>
  );
};

export default RecordsPT;
