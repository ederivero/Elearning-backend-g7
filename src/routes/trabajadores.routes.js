import { Router } from "express";
import { postTrabajador } from "../controllers/trabajadores.controllers.js";

export const trabajadoresRouter = Router();

trabajadoresRouter.post("/registro", postTrabajador);
