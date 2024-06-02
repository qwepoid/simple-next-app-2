import express from "express";
import {
  getEquipmentDetails,
  updateEquipment,
} from "../controllers/equipments/index.js";

const equipmentsRouter = express.Router();

equipmentsRouter.get("/getEquipmentDetails/:id", getEquipmentDetails);
equipmentsRouter.post("/update", updateEquipment);

export default equipmentsRouter;
