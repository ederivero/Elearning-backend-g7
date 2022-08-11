import mongoose from "mongoose";

// Todas las configuraciones de nuestra coleccion que declaremos en mongoose solamente van a servir para mongoose (recordemos que en una bd no relacional podemos agregar lo que queramos), por ende se recomienda NO TOCAR DIRECTAMENTE LA BD SI SE TRABAJA CON MONGOOSE

const detalleProductoSchema = new mongoose.Schema({
  tallas: [mongoose.Schema.Types.String],
  unidadMedida: {
    alias: "unidad_medida",
    type: mongoose.Schema.Types.String,
    enum: ["Litros", "Kilos", "N/A", "Onzas"],
    default: "N/A",
  },
});

// https://mongoosejs.com/docs/schematypes.html#schematype-options
const productoSchema = new mongoose.Schema({
  nombre: {
    type: mongoose.Schema.Types.String, // parametro obligatorio
    required: true, // se debe de pedir obligatoriamente el valor
  },
  precio: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    min: 0.0,
    alias: "precio_venta",
  },
  cantidad: {
    type: mongoose.Schema.Types.Number,
    required: true,
    min: 0,
  },
  descripcion: mongoose.Schema.Types.String,
  foto: mongoose.Schema.Types.String,

  // seria una representacion de una relacion 1-1 en una bd no relacional ya que el objeto detalleProductoSchema estaria dentro del productoSchema y solamente perteneceria ese detalle al producto
  detalleProducto: {
    type: detalleProductoSchema,
  },
});

// esto hace la reacion de la coleccion en la base de datos basandose en el schema previamente definido
export const productoModel = mongoose.model("productos", productoSchema);
