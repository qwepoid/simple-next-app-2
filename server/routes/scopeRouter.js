import express from "express";
import {
  addScope,
  getScope,
  getGroups,
  getMaterials,
} from "../controllers/scope.js";

const scopeRouter = express.Router();

scopeRouter.get("/getScope", getScope);

scopeRouter.get("/getGroups", getGroups);

scopeRouter.get("/getMaterials", getMaterials);

scopeRouter.post("/addScope", addScope);

export default scopeRouter;
