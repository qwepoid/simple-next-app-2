import express from "express";
import {
  createQuotation,
  getQuotation,
  updateQuotation,
  deleteQuotation,
} from "../controllers/quotation.js";

const quotationRouter = express.Router();
quotationRouter.get("/", getQuotation);

quotationRouter.post("/create", createQuotation);

quotationRouter.post("/update", updateQuotation);

quotationRouter.post("/delete/:id", deleteQuotation);

quotationRouter.get("/:id", getQuotation);

export default quotationRouter;
