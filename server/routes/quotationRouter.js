import express from "express";
import { createQuotation, getQuotation } from "../controllers/quotation.js";

const quotationRouter = express.Router();
quotationRouter.get("/", getQuotation);

quotationRouter.post("/create", createQuotation);

quotationRouter.post("/:id", getQuotation);

export default quotationRouter;
