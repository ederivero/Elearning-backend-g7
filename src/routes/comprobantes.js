import { Router } from "express";
import {
  crearComprobante,
  buscarComprobante,
} from "../controllers/comprobantes.js";

export const comprobanteRouter = Router();

comprobanteRouter
  .route("/comprobantes")
  .post(crearComprobante)
  .get(buscarComprobante);
