import { usuarioModel } from "../models/usuarios.js";
import { usuarioRequestDTO, loginRequestDTO } from "../dtos/usuarios.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const crearUsuario = async (req, res) => {
  try {
    const data = usuarioRequestDTO(req.body);
    // otra forma de guardar un registro en un modelo usando un constructor de clase
    const nuevoUsuario = new usuarioModel(data);
    await nuevoUsuario.save(); // aca recien se asignara el _id a este usuario

    const { password, ...resultado } = nuevoUsuario.toJSON();
    return res.status(201).json({
      message: "Usuario creado exitosamente",
      result: resultado,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      result: null,
    });
  }
};

export const login = async (req, res) => {
  try {
    const data = loginRequestDTO(req.body);
    const usuarioEncontrado = await usuarioModel.findOne({ email: data.email });

    if (!usuarioEncontrado) {
      return res.status(200).json({
        message: "Usuario no existe",
        result: null,
      });
    } else {
      if (bcryptjs.compareSync(data.password, usuarioEncontrado.password)) {
        const token = jwt.sign(
          {
            id: usuarioEncontrado._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          message: "Usuario existe",
          result: token,
        });
      } else {
        return res.status(200).json({
          message: "Usuario no existe",
          result: null,
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      result: null,
    });
  }
};
