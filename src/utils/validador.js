import _ from "lodash";
import jwt from "jsonwebtoken";
import { PrismaConnector } from "../prisma.js";
import prisma from "@prisma/client";

// middleware > intermediario que sirve para hacer un trabajo previo al controlador final
export const verificarToken = async (req, res, next) => {
  if (_.isNil(req.headers.authorization)) {
    // valido que me envien los headers de authorization
    return res.status(401).json({
      message: "Se necesita una token para realizar esta peticion",
    });
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer asdasdasdasd.asdasdasdasd.asdasdasds"
    if (_.isNil(token)) {
      throw new Error("No hay token");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);

    const trabajador = await PrismaConnector.trabajador.findUniqueOrThrow({
      where: {
        id: payload.id,
      },
    });

    req.user = trabajador;

    next();
  } catch (error) {
    return res.status(400).json({
      message: "Token invalida",
      content: error.message,
    });
  }
};

export const isGerente = async (req, res, next) => {
  // solamente los usuarios que son gerentes podran continuar, los demas no
  if (req.user.rol !== prisma.ROL_TRABAJADOR.GERENTE) {
    return res.status(403).json({
      message: "Usuario no tiene los permisos suficientes",
      result: null,
    });
  } else {
    next();
  }
};
