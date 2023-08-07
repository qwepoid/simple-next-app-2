import { useRouter } from "next/router";
import React from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const Quotations: React.FC = () => {
  const router = useRouter();
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
  return (
    <div>
      <div className="flex justify-between">
        <h1>My Quotations</h1>
        <button className="mt-16" onClick={handlePdf}>
          Create new Quotation
        </button>

        {/* <Typography variant="h4">My Quotations</Typography> */}
      </div>
    </div>
  );
};

export default Quotations;
