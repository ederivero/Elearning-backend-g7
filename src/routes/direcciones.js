import { Router } from "express";
import {
  crearDireccion,
  listarDirecciones,
} from "../controllers/direcciones.js";
import { validarToken } from "../utils/validador.js";

export const direccionRouter = Router();

direccionRouter
  .route("/direccion")
  .post(validarToken, crearDireccion)
  .get(validarToken, listarDirecciones);
// TODO: Editar direccion - eliminar direccion (necesitamos el ID de la direccion para la edicion y eliminacion entonces hacer las modificaciones en el schema de direccionSchema para volver a generar el _id)
