import { carritoModel } from "../models/carritos.js";
import { carritoRequestDTO } from "../dtos/carritos.js";

export const crearCarrito = async (req, res) => {
  try {
    const usuario = req.user; // objecto del usuario logeado
    const data = carritoRequestDTO(req.body);
    // busco si ya existe el carrito de ese usuario
    const carrito = await carritoModel.findOne(
      { usuarioId: usuario._id },
      { usuarioId: true, detalle: true, _id: true } // que columnas queremos extraer de esta consulta
    );

    if (carrito) {
      // si existe agregare al detalle el nuevo producto a agregar
      carrito.detalle.push(data);
      await carrito.save();

      return res.status(201).json({
        message: "Articulo agregado exitosamente",
        content: carrito,
      });
    } else {
      // si es la primera vez que el usuario va a crear su carrito lo crearemos y agregaremos el nuevo item
      const nuevoCarrito = await carritoModel.create({
        usuarioId: usuario._id,
        detalle: [data],
      });

      return res.status(201).json({
        message: "Articulo agregado exitosamente",
        content: nuevoCarrito,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      result: null,
    });
  }
};

export const listarCarrito = async (req, res) => {
  try {
    // en base al req.user (objeto de usuario _id) hacer la busqueda del carrito de ese usuario
    const { user } = req;
    const carrito = await carritoModel.findOne({ usuarioId: user._id });

    return res.json({
      result: carrito,
      message: null,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      result: null,
    });
  }
};
