import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import { useRef } from "react";
import { handleFileDownload } from "./utils";

const RecordsPT = ({ addNewEntry = false, records }) => {
  const inputRef = useRef(null);

  function handleUploadClick() {
    inputRef.current.click();
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
      <div className="mb-4 font-bold underline text-stone-600 text-xl">
        Records
      </div>
      <table>
        <tr>
          <th className="p-2 border">S.No.</th>
          <th className="p-2 border">Agency</th>
          <th className="p-2 border">Ref. No</th>
          <th className="p-2 border">Discipline</th>
          <th className="p-2 border">Material</th>
          <th className="p-2 border">Report</th>
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
        {records?.map(({ agency, ref, discipline, material }, index) => (
          <tr>
            <td className="p-2 border">{index + 1}</td>
            <td className="p-2 border">{agency}</td>
            <td className="p-2 border">{ref}</td>
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
          </tr>
        ))}
      </table>
    </>
  );
};

export default RecordsPT;
