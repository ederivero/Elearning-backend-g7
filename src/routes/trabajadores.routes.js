import { Router } from "express";
import {
  postTrabajador,
  validarTrabajador,
  cambiarPassword,
} from "../controllers/trabajadores.controllers.js";

export const trabajadoresRouter = Router();

trabajadoresRouter.post("/registro", postTrabajador);
trabajadoresRouter.post("/validar-trabajador", validarTrabajador);
trabajadoresRouter.post("/cambiar-password", cambiarPassword);
