import express from "express";
import { createQuotation, getQuotation } from "../controllers/pdf.js";

const pdfRouter = express.Router();

/** Quotation */

pdfRouter.post("/createQuotation", createQuotation);

pdfRouter.get("/getQuotation", getQuotation);

/** Report */

/** Bill */

export default pdfRouter;
