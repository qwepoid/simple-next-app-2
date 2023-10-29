import express from "express";
import { createQuotation } from "../controllers/pdf.js";

const pdfRouter = express.Router();

/** Quotation */

pdfRouter.post("/createQuotation", createQuotation);

/** Report */

/** Bill */

export default pdfRouter;
