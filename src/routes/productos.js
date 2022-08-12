import { Router } from "express";
import {
  crearProducto,
  listarProductos,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productos.js";

export const productoRouter = Router();

productoRouter.route("/producto").post(crearProducto).get(listarProductos);
productoRouter
  .route("/producto/:id")
  .put(actualizarProducto)
  .delete(eliminarProducto);
