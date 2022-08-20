import { ProductoModel } from "../models/productos.js";

export const crearProducto = async (req, res) => {
  try {
    const data = req.body;
    // TODO: se debe crear un DTO para validar la informacion que recibira el body
    const nuevoProducto = await ProductoModel.create(data);

    return res.status(201).json({
      message: "Producto creado exitosamente",
      result: nuevoProducto,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear el producto",
      result: error.message,
    });
  }
};
