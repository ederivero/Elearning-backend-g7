import { Router } from "express";
import { crearProducto, listarProductos } from "../controllers/productos.js";

export const productoRouter = Router();

productoRouter.route("/producto").post(crearProducto).get(listarProductos);
