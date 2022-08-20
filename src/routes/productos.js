import { Router } from "express";
import * as controlador from "../controllers/productos.js";

export const productoRouter = Router();

productoRouter.route("/productos").post(controlador.crearProducto);
