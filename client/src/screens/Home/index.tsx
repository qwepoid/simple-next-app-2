import type { NextPage } from "next";
import styles from "../../../styles/Home.module.css";
import CalibrationCard from "./Cards/CalibrationCard";
import { useRouter } from "next/router";
import WorkCard from "./Cards/WorkCard";
import PtIlcCard from "./Cards/PtIlcCard";
import PaymentsCard from "./Cards/PaymentsCard";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import useGetDashboardData from "./service-hooks/useGetDashboardData";

const Home: NextPage = () => {
  const router = useRouter();

  const fileRef = ref(storage, "calibrations/obnoxious.pdf");

  const { dashboardData } = useGetDashboardData();

  // getDownloadURL(fileRef)
  //   .then((url) => {
  //     // fetch(url);
  //     // Fetch the file content using the obtained URL
  //     // fetch(url)
  //     //   .then((response) => response.blob())
  //     //   .then((blob) => {
  //     //     // Handle the file content
  //     //     console.log("File content:", blob);
  //     //   })
  //     //   .catch((error) => {
  //     //     console.error("Error reading file:", error);
  //     //   });
  //     ///
  //     console.log("url: ", url);
  //     const xhr = new XMLHttpRequest();
  //     xhr.responseType = "blob";
  //     xhr.onload = (event) => {
  //       const blob = xhr.response;
  //     };
  //     xhr.open("GET", url);
  //     xhr.send();
  //   })
  //   .catch((error) => {
  //     console.error("Error getting download URL:", error);
  //   });

  function handleChange() {
    const fileElement = document.getElementById(
      "fileInput"
    ) as HTMLInputElement;
    const file = fileElement?.files[0]; // Assuming you have an input element with id 'fileInput' to select the file
    const storageRef = ref(storage, "abc.csv"); // Specify the destination path for the file
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("File uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  }

  async function downloadReport() {
    fetch("http://localhost:5000/create-pdf", {
      method: "POST",
    }).then(async () => {
      const response = await fetch("http://localhost:5000/fetch-pdf"); // Adjust the URL to match your server route
      const blob = await response.blob();

      // Create a blob URL and open it in a new window/tab
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    });
    // .then(() => fetch("/fetch-pdf").then((res) => res))
    // .then((blob) => {
    //   console.log("blob: ", blob);
    //   const pdfBlob = new Blob([blob], { type: "application/pdf" });
    //   console.log("pdfBlob: ", pdfBlob);
    //   // new Blob([res?.data], { type: "application/pdf" });
    //   downloadFile(pdfBlob, "myfile.pdf");
    // });
  }

  const downloadFile = (blob, fileName) => {
    const link = document.createElement("a");
    // create a blobURI pointing to our Blob
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    // some browser needs the anchor to be in the doc
    document.body.append(link);
    link.click();
    link.remove();
    // in case the Blob uses a lot of memory
    setTimeout(() => URL.revokeObjectURL(link.href), 7000);
  };

  return (
    <div>
      <main className="sm:flex-col md:flex lg:flex-row gap-4 items-center">
        {/* <input type="file" id="fileInput" onChange={handleChange} /> */}
        <CalibrationCard data={dashboardData?.calibrations} />
        <WorkCard handleClick={undefined} />
        <PtIlcCard handleClick={() => router.push("pt-ilc")} />
        <PaymentsCard handleClick={() => router.push("payments")} />
        <button onClick={downloadReport}>Click me</button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://enggresearchlabs.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Engg Research Labs
        </a>
      </footer>
    </div>
  );
};

export default Home;
