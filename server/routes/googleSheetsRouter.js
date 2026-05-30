import express from "express";
import {
  syncSheetsToDashboard,
  getCachedDashboardSnapshot,
} from "../controllers/sheetsSync.js";

const googleSheetsRouter = express.Router();

googleSheetsRouter.get("/sheets", getCachedDashboardSnapshot);

googleSheetsRouter.post("/sheets", syncSheetsToDashboard);

export default googleSheetsRouter;
