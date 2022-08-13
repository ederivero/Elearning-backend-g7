import { Router } from "express";
import {
    crearPreferencia,
    crearUsuarioDePrueba
} from '../controllers/pagos.js';

export const pagosRouter = Router()

pagosRouter.route('/crearUsuarioDePrueba').post(crearUsuarioDePrueba)
pagosRouter.route('/crearPreferencia').post(crearPreferencia)
