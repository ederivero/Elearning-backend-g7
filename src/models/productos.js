import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    precio: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
      get: (valor) => +valor.toString(),
    },
    foto: {
      type: mongoose.Schema.Types.String,
    },
  },
  {
    // es una propiedad que se setea en cada documento cuando es creada por mongoose. esta llave '__v' contiene el valor interno de la revision del documento. el nombre de la llave puede ser configurada pero su nombre por defecto es '__v'
    versionKey: false, // sirve para prescindir de la version de nuestro registro de mongodb
  }
);

export const ProductoModel = mongoose.model("productos", productoSchema);

productoSchema.set("toJSON", { getters: true });
