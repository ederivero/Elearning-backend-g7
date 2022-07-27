import { trabajadoresRequestDTO } from "../dtos/trabajadores.dto.js";

export const postTrabajador = (req, res) => {
  try {
    const data = trabajadoresRequestDTO(req.body);

    return res.json({
      message: "Usuario registrado exitosamente",
      result: null,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear el usuario",
      result: error.message,
    });
  }
};
