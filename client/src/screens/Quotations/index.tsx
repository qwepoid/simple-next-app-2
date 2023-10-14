import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import useGetQuotations from "./custom-hooks/useGetQuotations";
import dayjs from "dayjs";
import QuotationSearch from "./QuotationSearch";

const Quotations: React.FC = () => {
  const router = useRouter();
  const [searchString, setSearchString] = useState("");

  async function handlePdf() {
    const pdfDoc = await PDFDocument.create();

    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Add a blank page to the document
    const page = pdfDoc.addPage();

    // Get the width and height of the page
    const { width, height } = page.getSize();

    // Draw a string of text toward the top of the page
    const fontSize = 30;
    page.drawText("Creating PDFs in JavaScript is awesome!", {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();
    // console.log(pdfBytes);
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = "example.pdf";
    downloadLink.click();
  }

  const { data, isLoading, error, getQuotations } = useGetQuotations();

  const [onScreenQuotations, setOnScreenQuotations] = useState([]);

  useEffect(() => {
    if (data) {
      setOnScreenQuotations(data);
    }
  }, [data]);

  useEffect(() => {
    getQuotations({ searchString });
  }, [searchString]);

  return (
    <div>
      <div className="flex justify-between">
        <h1>My Quotations</h1>
        <button
          className="mt-16 bg-red-500 border border-red-500 rounded-lg p-1 px-2 text-white hover:scale-105"
          onClick={() => router.push("/quotations/addNew")}
        >
          + New
        </button>
      </div>
      <div>
        <QuotationSearch
          handleSearch={(searchQuery) => setSearchString(searchQuery)}
          currentQuery={searchString}
        />
      </div>
      <div className="flex flex-col gap-2">
        {onScreenQuotations?.map((datum) => (
          <div
            className="flex rounded-md p-2  border border-blue-100 hover:bg-slate-50 cursor-pointer"
            onClick={() => router.push(`/quotations/${datum._id}`)}
          >
            <div className="left flex-grow flex flex-col">
              <div>Client: {datum.quotationTo}</div>
              <div>
                <span className="text-sm">Total </span>
                <span className="text-xs">(Incl. GST): </span>
                <span>250 crores</span>
              </div>
            </div>
            <div className="right min-w-[200px]">
              Date of Quotation:{" "}
              {dayjs(datum.dateOfQuotation).format("MMM DD, YYYY")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quotations;
