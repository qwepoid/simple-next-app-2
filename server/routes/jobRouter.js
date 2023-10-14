import express from "express";
import { getJobDetails, updateJob } from "../controllers/job.js";

const jobRouter = express.Router();

jobRouter.get("/:id", getJobDetails);
jobRouter.post("/update", updateJob);

export default jobRouter;
