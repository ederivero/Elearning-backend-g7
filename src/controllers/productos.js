import { productoModel } from "../models/productos.js";

export const crearProducto = async (req, res) => {
  try {
    const data = req.body;

    const nuevoProducto = await productoModel.create(data);
    nuevoProducto.toJSON(); // extrae la informacion de la nueva instancia creada y la convierte a un JSON para que pueda ser legible por el front

    return res.status(201).json({
      message: "Producto creado exitosamente",
      result: nuevoProducto.toJSON(),
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear el producto",
      result: error.message,
    });
  }
};

export const listarProductos = async (req, res) => {
  console.log(req.query);
  // like %Monitor% > /Monitor/
  // like M% > /^M/
  // like %r > /r$/
  const { nombre, precioDesde, precioHasta } = req.query;
  let filtro = {};

  if (nombre) {
    // https://www.mongodb.com/docs/manual/reference/operator/query/regex/ > busqueda usando LIKEs
    filtro = { ...filtro, nombre: { $regex: nombre } };
  }

  if (precioDesde && precioHasta) {
    filtro = {
      ...filtro,
      $and: [
        { precio: { $gte: precioDesde } },
        { precio: { $lte: precioHasta } },
      ],
    };
  } else {
    if (precioDesde) {
      // gte > greater than or equal
      filtro = { ...filtro, precio: { $gte: precioDesde } };
    }

    if (precioHasta) {
      // lte > less than or equal
      filtro = { ...filtro, precio: { $lte: precioHasta } };
    }
  }

  const productos = await productoModel.find(filtro); // devolver todos los productos donde el nombre sea Monitor

  return res.status(200).json({
    result: productos,
    message: null,
  });
};
