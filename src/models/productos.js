import mongoose from "mongoose";

// Todas las configuraciones de nuestra coleccion que declaremos en mongoose solamente van a servir para mongoose (recordemos que en una bd no relacional podemos agregar lo que queramos), por ende se recomienda NO TOCAR DIRECTAMENTE LA BD SI SE TRABAJA CON MONGOOSE

const unidadMedidaValores = ["Litros", "Kilos", "N/A", "Onzas"];

const detalleProductoSchema = new mongoose.Schema({
  tallas: [mongoose.Schema.Types.String],
  unidadMedida: {
    alias: "unidad_medida",
    type: mongoose.Schema.Types.String,
    enum: unidadMedidaValores, // solamente sirve al momento de crear una nueva instancia mas no al momento de actualizar o modificar
    default: "N/A",
    set: (valor) => {
      console.log(valor);
      if (unidadMedidaValores.includes(valor)) {
        return valor;
      } else {
        throw new Error();
      }
    },
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
    // alias: "precio_venta",
    get: (valor) => {
      // console.log(valor);
      return +valor.toString();
    },
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

// seteamos el comportamiento en este caso del metodo toJSON para convertir la informacion que tengamos en la llave precio y ademas eliminas la llave __v
productoSchema.set("toJSON", {
  getters: true,
  // transform: (doc, prod) => {
  //   if (prod.precio) {
  //     prod.precio = +prod.precio.toString();
  //   }
  //   delete prod.__v;
  //   return prod;
  // },
});
