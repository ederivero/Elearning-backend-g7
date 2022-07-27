import { Router } from "express";
import { getDepartamentos } from "../controllers/departamentos.controllers.js";

export const departamentosRouter = Router();

departamentosRouter.get("/departamentos", getDepartamentos);
