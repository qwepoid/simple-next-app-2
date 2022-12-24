import express from "express";
import { getEquipmentDetails } from "../controllers/equipments.js";

const equipmentsRouter = express.Router();

equipmentsRouter.get("/getEquipmentDetails/:id", getEquipmentDetails);

export default equipmentsRouter;
