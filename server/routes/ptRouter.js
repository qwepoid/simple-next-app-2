import express from "express";
import { getRecords, addRecord, deleteRecord } from "../controllers/pt.js";
const ptRouter = express.Router();

// ptRouter.post("/add", addRecord);

// ptRouter.post("/remove", removeRecord);

// ptRouter.post("/update", updateRecord);

ptRouter.get("/getRecords", getRecords);
ptRouter.post("/addRecord", addRecord);
ptRouter.post("/deleteRecord", deleteRecord);

export default ptRouter;
