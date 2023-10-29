import pdfTemplate from "../documents/index.js";
import pdf from "html-pdf";

export const createQuotation = async (req, res) => {
  console.log("req.body: ", req.body);
  new Promise((resolve, reject) => {
    pdf
      .create(pdfTemplate(req.body), {
        directory: "/tmp",
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
      .toFile("./tmp/quotation.pdf", (err) => {
        if (err) {
          console.log("error writing to /tmp/quotation.pdf", err);
          res.send(Promise.reject());
          reject(1);
        }
        console.log("success");
        resolve(1);
      });
  }).then(() => res.sendFile(`quotation.pdf`, { root: "./tmp" }));
};
