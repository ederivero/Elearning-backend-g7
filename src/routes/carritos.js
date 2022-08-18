import { Router } from "express";
import { crearCarrito, listarCarrito } from "../controllers/carritos.js";
import { validarToken } from "../utils/validador.js";

export const carritoRouter = Router();

carritoRouter
  .route("/carrito")
  .all(validarToken)
  .post(crearCarrito)
  .get(listarCarrito);
