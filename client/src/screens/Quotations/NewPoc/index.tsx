import { useFormik } from "formik";
import { useState } from "react";
import Image from "next/image";
import { NablLogo } from "../../../../public";
import { PDFDocument, PDFImage, StandardFonts, rgb } from "pdf-lib";

const NewPoc = () => {
  const formik = useFormik({
    initialValues: {
      quotationTo: "",
      subject: "select",
      reference: "",
      quotationItems: [],
      dateOfQuotation: "",
    },
    onSubmit: (values) => {
      const payload = JSON.stringify(values);
      alert(JSON.stringify(values, null, 2));
      downloadPdf(payload);
    },
  });

  console.log(formik.values);
  const [dataUrl, setDataUrl] = useState("");

  function handleFileUpload(e) {
    let files = e.target.files[0];
    setDataUrl(URL.createObjectURL(files));
  }

  let image: PDFImage;

  const loadImageAsBase64 = async () => {
    try {
      // Replace 'your-image-file.jpg' with the actual path to your image in the assets folder
      const response = await fetch("../../../../public/nablLogo.png");
      const blob = await response.blob();

      const reader = new FileReader();
      reader.onloadend = () => {
        // The result will be the Base64 representation of the image
        const base64String = reader.result;
        return base64String;
      };

      return reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };

  async function downloadPdf(payload) {
    fetch("http://localhost:5000/pdf/createQuotation", {
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer `
      },
    }).then(async () => {
      const response = await fetch("http://localhost:5000/pdf/getQuotation"); // Adjust the URL to match your server route
      const blob = await response.blob();

      // Create a blob URL and open it in a new window/tab
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    });
  }

  //   async function readImage() {
  //     const response = await getBase64(NablLogo);
  //     const pdfData = await response.arrayBuffer();
  //     return pdfData;
  //     // image = await pdfDoc.embedPng(imageBytes);
  //   }

  async function handlePdf() {
    const pdfDoc = await PDFDocument.create();
    let espData = await loadImageAsBase64();

    console.log("----------------------------------------" + espData);
    // const imageBytes = await readImage();

    // const image = await pdfDoc.embedPng(imageBytes);

    // const { width: imgWidth, height: imgHeight } = image.scale(0.5);

    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Add a blank page to the document
    const page = pdfDoc.addPage();

    // Get the width and height of the page
    const { width, height } = page.getSize();

    // Draw a string of text toward the top of the page
    const fontSize = 30;
    page.drawText("ENGG RESEARCH LABS.", {
      x: 140,
      y: height - 40,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });
    // page.drawImage(image, {
    //   x: 240,
    //   y: height - 40,
    //   width: imgWidth,
    //   height: imgHeight,
    // });
    page.drawText("(An NABL Accredited Lab)", {
      x: 240,
      y: height - 60,
      size: 12,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });
    page.drawText("(MATERIAL TESTING AND GEO-TECHNICAL INVESTIGATION LAB)", {
      x: 120,
      y: height - 80,
      size: 12,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });

    page.drawText(
      "GROUND FLOOR, OSCAR GYM BUILDING, BABLIANA ROAD, GANGYAL, JAMMU - 180010",
      {
        x: 50,
        y: height - 100,
        size: 12,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
      }
    );
    page.drawText(
      "Contact: 94191-85696 | E-mail: erljmu@rediffmail.com | Website: enggresearchlabs.com",
      {
        x: 90,
        y: height - 120,
        size: 12,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
      }
    );

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    // console.log(pdfBytes);
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = "example.pdf";
    downloadLink.click();
  }

  //   function shouldBeDisabled() {
  //     return Boolean(
  //       !formik.values.material ||
  //         formik.values.material === "select" ||
  //         !formik.values.discipline ||
  //         formik.values.discipline === "select" ||
  //         !formik.values.ptProvider ||
  //         !formik.values.uniqueId ||
  //         !formik.values.dateOfPt ||
  //         !formik.values.testParameters.length
  //     );
  //   }
  //   const isDisabled = shouldBeDisabled();
  //   const { data: paramters, getRecords } = useGetTestParameters();

  //   useEffect(() => {
  //     formik.values.testParameters = [];
  //     if (formik.values.material.length) getRecords(formik.values.material);
  //   }, [formik.values.material]);

  //   function handleParameterSelection(idx) {
  //     let selectedParameter = paramters[idx];
  //     if (formik.values.testParameters.includes(selectedParameter)) {
  //       formik.values.testParameters = formik.values.testParameters.filter(
  //         (param) => param != selectedParameter
  //       );
  //       return;
  //     }
  //     formik.values.testParameters.push(paramters[idx]);
  //   }

  const removeItem = (index) => {
    const updatedHobbies = [...formik.values.quotationItems];
    updatedHobbies.splice(index, 1);
    formik.setFieldValue("quotationItems", updatedHobbies);
  };
  const addItem = () => {
    formik.setFieldValue("quotationItems", [
      ...formik.values.quotationItems,
      { itemName: "", durationOfPlay: "", achievements: "" },
    ]);
  };
  return (
    <div className="mt-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col lg:grid lg:grid-cols-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:col-span-2 gap-4">
            <span className="mt-4 text-lg font-medium text-gray-500 list-item col-span-2">
              Client Details
            </span>
            <div className="flex lg:col-span-2 gap-2 justify-between">
              <div className="w-48 flex flex-col">
                <label className="text-xs text-gray-400">To*</label>
                <textarea
                  id="quotationTo"
                  className="outline-none border-2 rounded-lg p-2 w-96 col-span-2"
                  placeholder="Enter complete Address"
                  onChange={formik.handleChange}
                  value={formik.values.quotationTo}
                  wrap="soft"
                />
              </div>
              <div className="w-48 flex flex-col">
                <label className="text-xs text-gray-400">To*</label>
                <input
                  type="date"
                  id="dateOfQuotation"
                  className="outline-none border-2 rounded-lg p-2 col-span-2"
                  placeholder="Enter complete Address"
                  onChange={formik.handleChange}
                  value={formik.values.dateOfQuotation}
                />
              </div>
            </div>
            <div className="w-full col-span-2 flex flex-col">
              <label className="text-xs text-gray-400">Subject*</label>
              <input
                id="subject"
                className="outline-none border-2 rounded-lg p-2 col-span-2"
                placeholder="Enter complete Address"
                onChange={formik.handleChange}
                value={formik.values.subject}
              />
            </div>
            <div className="w-full col-span-2 flex flex-col">
              <label className="text-xs text-gray-400">Reference*</label>
              <input
                id="reference"
                className="outline-none border-2 rounded-lg p-2 col-span-2"
                placeholder="eg. Phone call on July 10, 2023"
                onChange={formik.handleChange}
                value={formik.values.reference}
              />
            </div>

            <span className="mt-4 text-lg font-medium text-gray-500 list-item col-span-2">
              Item Details
            </span>
            <div className="w-96 flex flex-col lg:col-span-2">
              <label className="text-xs text-gray-400">Test Description*</label>
              <textarea
                id="ptProvider"
                className="outline-none border-2 rounded-lg p-2 w-96 col-span-2"
                placeholder="TC-XXXX-XXXX-XXXX*"
                onChange={formik.handleChange}
                value={formik.values.quotationItems}
              />
            </div>
            <div className="flex lg:col-span-2 gap-2 justify-around">
              <div className="w-24 flex flex-col">
                <label className="text-xs text-gray-400">Quantity*</label>
                <input
                  id="ptProvider"
                  className="outline-none border-2 rounded-lg p-2 w-full col-span-2"
                  placeholder="TC-XXXX-XXXX-XXXX*"
                  onChange={formik.handleChange}
                  value={formik.values.quotationItems}
                />
              </div>
              <div className="w-24 flex flex-col">
                <label className="text-xs text-gray-400">Unit*</label>
                <input
                  id="ptProvider"
                  className="outline-none border-2 rounded-lg p-2 w-full col-span-2"
                  placeholder="TC-XXXX-XXXX-XXXX*"
                  onChange={formik.handleChange}
                  value={formik.values.quotationItems}
                />
              </div>
              <div className="w-48 flex flex-col">
                <label className="text-xs text-gray-400">Rate</label>
                <input
                  id="ptProvider"
                  className="outline-none border-2 rounded-lg p-2 w-full col-span-2"
                  placeholder="TC-XXXX-XXXX-XXXX*"
                  onChange={formik.handleChange}
                  value={"$ " + formik.values.quotationItems}
                />
              </div>
            </div>
            <button type="button" onClick={addItem}>
              Add Item
            </button>
            {formik.values.quotationItems.map((_, index) => (
              <div key={index}>
                <label htmlFor={`quotationItems.${index}.itemName`}>
                  Item Name:
                </label>
                <input
                  id={`quotationItems.${index}.itemName`}
                  name={`quotationItems.${index}.itemName`}
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.quotationItems[index].itemName}
                />
                <label htmlFor={`quotationItems.${index}.durationOfPlay`}>
                  Duration of Play:
                </label>
                <input
                  id={`quotationItems.${index}.durationOfPlay`}
                  name={`quotationItems.${index}.durationOfPlay`}
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.quotationItems[index].durationOfPlay}
                />
                <label htmlFor={`quotationItems.${index}.achievements`}>
                  Achievements:
                </label>
                <input
                  id={`quotationItems.${index}.achievements`}
                  name={`quotationItems.${index}.achievements`}
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.quotationItems[index].achievements}
                />
                <button type="button" onClick={() => removeItem(index)}>
                  Remove Item
                </button>
              </div>
            ))}
            <div className="w-96 flex flex-col">
              <label className="text-xs text-gray-400">Unique Id*</label>
              <input
                id="uniqueId"
                type="text"
                className="outline-none border-2 rounded-lg p-2 mr-2 w-48"
                onChange={formik.handleChange}
                value={formik.values.uniqueId}
              />
            </div>
            <div className="w-96 flex flex-col">
              <label className="text-xs text-gray-400">Date of PT*</label>
              <input
                id="dateOfQuotation"
                type="date"
                className="outline-none border-2 rounded-lg p-2 ml-2 w-48"
                onChange={formik.handleChange}
                value={formik.values.dateOfQuotation}
              />
            </div>
            <div className="w-96 flex flex-col">
              <label className="text-xs text-gray-400 mb-2">
                Upload PT Certificate*
              </label>
              <input type="file" onChange={handleFileUpload} />
            </div>
            <button
            //   className={`p-2 rounded-lg col-span-2 w-40 place-self-center mb-10 ${
            //     isDisabled
            //       ? "bg-gray-100 text-gray-400 font-medium border-gray-900 border-b"
            //       : "bg-blue-500 text-white"
            //   }`}
            //   disabled={isDisabled}
            >
              Add PT Record
            </button>
            <button>Download Pdf</button>
          </div>
          <div className="sm:hidden lg:block lg:grid lg:col-span-2 border border-black ml-4 p-4 w-[630px] h-[891px] rounded-md shadow-2xl flex flex-col flex-1 relative bg-white overflow-clip">
            <div className="header flex justify-center relative">
              <div className="flex flex-col items-center">
                <span className="tex text-2xl font-serif font-medium">
                  ENGG RESEARCH LABS
                </span>
                <span className="text-xs">(NABL Accredted)</span>
                <span className="text-sm">
                  (MATERIAL TESTING AND GEO-TECHNICAL INVESTIGATION LAB)
                </span>
                <span className="text-xs text-center mt-1">
                  GROUND FLOOR, OSCAR GYM BUILDING, BABLIANA ROAD, GANGYAL,
                  JAMMU - 180010
                </span>
                <span className="text-xs">
                  Contact: 94191-85696 | E-mail: erljmu@rediffmail.com |
                  Website: enggresearchlabs.com
                </span>
              </div>
              <div className="absolute right-2 text-center -mt-2">
                <Image src={NablLogo} width={40} height={50} />
                <span className="text-xs font-bold block -mt-1">TC-9140</span>
              </div>
            </div>
            <div className="body1211 flex flex-col justify-start">
              <div className="flex justify-end mt-4">
                <span className="mr-1 font-medium text-xs">Date: </span>
                <span className="text-xs">{formik.values.dateOfQuotation}</span>
              </div>
              <div>
                <span className="block text-sm">To</span>
                {/* <textarea
                      id="quotationTo"
                      className="text-xs outline-none border-2 rounded-lg w-36 h-16 col-span-2"
                      placeholder="Enter complete Address"
                      onChange={formik.handleChange}
                      value={formik.values.quotationTo}
                      //   wrap="soft"
                    /> */}
                <span className="text-xs whitespace-pre-line leading-4 block">
                  {formik.values.quotationTo}
                </span>
              </div>
              <div className="flex justify-center underline font-semibold">
                QUOTATION
              </div>
              <div>
                <span className="font-medium text-sm">Subject: </span>
                <span className="text-sm">{formik.values.subject}</span>
              </div>
              <div>
                <span className="font-medium text-sm">Reference: </span>
                <span className="text-sm">{formik.values.reference}</span>
              </div>
              <table className="text-center max-h-40">
                <tr>
                  <th className="border border-black min-w-[20px] text-xs">
                    S.No.
                  </th>
                  <th className="border border-black text-xs">Particulars</th>
                  <th className="border border-black text-xs">Qty</th>
                  <th className="border border-black text-xs">Unit</th>
                  <th className="border border-black text-xs">Rate</th>
                </tr>
                {Array(30).fill(
                  <tr>
                    <td className="border border-black w-4 text-xs">1</td>
                    <td className="border border-black text-xs max-w-[100px]">
                      Particulars Particulars
                    </td>
                    <td className="border border-black text-xs w-8">12</td>
                    <td className="border border-black text-xs max-w-[20px]">
                      Boreholes
                    </td>
                    <td className="border border-black text-xs max-w-[10px]">
                      $ 20,000
                    </td>
                  </tr>
                )}
              </table>
            </div>
            <div className="flex items-center min-h-[100px] w-full bg-white absolute bottom-0 p-4 text-sm">
              For Engg. Research Labs
            </div>
            {/* <object
                  data={dataUrl}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                  className="hidden lg:block"
                >
                  <p>
                    Alternative text - include a link{" "}
                    <a href={dataUrl}>to the PDF!</a>
                  </p>
                </object> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPoc;