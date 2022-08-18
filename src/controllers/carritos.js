import { carritoModel } from "../models/carritos.js";
import { carritoRequestDTO } from "../dtos/carritos.js";

export const crearCarrito = async (req, res) => {
  try {
    const data = carritoRequestDTO(req.body);
    const nuevoCarrito = await carritoModel.create(data);

    return res.status(201).json({
      message: "Articulo agregado exitosamente",
      content: nuevoCarrito,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      result: null,
    });
  }
};
