import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebaseConfig";

export const formatFileNameForFirebase = (fileName) => {
    return fileName.replace(/\//g, ":");
}

export function handleFileDownload(filename) {
    const updatedFileName = formatFileNameForFirebase(filename)
    const fileRef = ref(storage, `pt/${updatedFileName}.pdf`);
    getDownloadURL(fileRef).then((url) => {
      console.log("pt url: ", url);
      window.open(url, "_blank");
    });
  }