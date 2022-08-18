import { Router } from "express";
import {
  crearPreferencia,
  crearUsuarioDePrueba,
  crearPago,
} from "../controllers/pagos.js";

import { validarToken } from "../utils/validador.js";

export const pagosRouter = Router();

pagosRouter.route("/crearUsuarioDePrueba").post(crearUsuarioDePrueba);
pagosRouter.route("/crearPreferencia").post(crearPreferencia);
pagosRouter.post("/crear-pago", validarToken, crearPago);
