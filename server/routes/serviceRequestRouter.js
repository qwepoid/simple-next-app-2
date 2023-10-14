import express from "express";
import {
  createServiceRequest,
  getServiceRequest,
} from "../controllers/serviceRequest.js";

const serviceRequestRouter = express.Router();

serviceRequestRouter.get("/", getServiceRequest);
serviceRequestRouter.get("/:id", getServiceRequest);

serviceRequestRouter.post("/createServiceRequest", createServiceRequest);

export default serviceRequestRouter;
