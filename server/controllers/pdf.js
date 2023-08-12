import pdfTemplate from "../documents/index.js";
import pdf from "html-pdf";

export const getQuotation = async (req, res) => {
  res.sendFile(`quotation.pdf`, { root: "." });
};

export const createQuotation = async (req, res) => {
  console.log("req.body: ", req.body);
  pdf
    .create(pdfTemplate(req.body), {
      header: {
        height: "68mm",
      },
      footer: {
        height: "28mm",
        contents: {
          last: '<div style="display: flex; position: absolute; bottom: 32; padding: 1rem; align-items: center; width: 100%; font-size: 0.75rem;line-height: 1.25rem; background-color: #ffffff; ">For Engg. Research Labs</div>', // fallback value
        },
      },
    })
    .toFile("quotation.pdf", (err) => {
      if (err) {
        console.log("error");
        res.send(Promise.reject());
      }
      console.log("success");
      res.send(Promise.resolve());
    });
};
