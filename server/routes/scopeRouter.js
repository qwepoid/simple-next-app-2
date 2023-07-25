import express from "express";
import { getTestParameters } from "../controllers/scope.js";

const scopeRouter = express.Router();

scopeRouter.post("/getTestParameters", getTestParameters);

export default scopeRouter;
