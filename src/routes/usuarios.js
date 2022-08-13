import { Router } from "express";
import { crearUsuario, login } from "../controllers/usuarios.js";

export const usuarioRouter = Router();

usuarioRouter.post("/registro", crearUsuario);
usuarioRouter.post("/login", login);
