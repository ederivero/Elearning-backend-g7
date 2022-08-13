import _ from "lodash";
import jwt from "jsonwebtoken";
import { usuarioModel } from "../models/usuarios.js";

export const validarToken = async (req, res, next) => {
  // valido que me envie los headers de authorization
  if (_.isNil(req.headers.authorization)) {
    return res.status(401).json({
      message: "Se necesita una token para realizar esta peticion",
      result: null,
    });
  }

  // en el header de authorization me llegara la siguiente informacion: Bearer xxx.xxx.xxx
  const token = req.headers.authorization.split(" ")[1];
  if (_.isNil(token)) {
    return res.status(401).json({
      message: "Formato de token no valido",
      result: null,
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // {id: 'asdasdasd'}
    const usuario = await usuarioModel.findById(payload.id);
    // agregamos al request la llave user en la cual almacenaremos el usuario para que pueda ser utilizado en los demas controladores siguientes
    req.user = usuario;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Error al decifrar la token",
      result: error.message,
    });
  }
};
