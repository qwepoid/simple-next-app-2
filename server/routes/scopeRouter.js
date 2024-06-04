import express from "express";
import { addScope, getScope } from "../controllers/scope.js";

const scopeRouter = express.Router();

scopeRouter.get("/getScope", getScope);

scopeRouter.post("/addScope", addScope);

export default scopeRouter;
