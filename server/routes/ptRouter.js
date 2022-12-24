import express from "express";
import { getRecords } from "../controllers/pt.js";
const ptRouter = express.Router();

// ptRouter.post("/add", addRecord);

// ptRouter.post("/remove", removeRecord);

// ptRouter.post("/update", updateRecord);

ptRouter.get("/getRecords", getRecords);

export default ptRouter;
