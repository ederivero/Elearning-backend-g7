import mongoose from "mongoose";
import { usuarioModel } from "./usuarios.js";
import { productoModel } from "./productos.js";

const carritoDetalleSchema = new mongoose.Schema(
  {
    productoId: {
      name: "producto_id",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      validate: async (data) => {
        // validamos que ese ID sea de un producto existente
        const productoEncontrado = await productoModel.findById(data);
        if (productoEncontrado) {
          return data;
        } else {
          throw new Error();
        }
      },
    },
    cantidad: {
      required: true,
      default: 1,
      type: mongoose.Schema.Types.Number,
    },
  },
  {
    _id: false,
  }
);

const carritoSchema = new mongoose.Schema(
  {
    usuarioId: {
      name: "usuario_id",
      required: true,
      index: true,
      unique: true,
      type: mongoose.Schema.Types.ObjectId,
      validate: async (data) => {
        // buscar que ese usuario exista
        const usuarioEncontrado = await usuarioModel.findById(data);
        if (usuarioEncontrado) {
          return data;
        } else {
          throw new Error();
        }
      },
    },
    detalle: {
      type: [carritoDetalleSchema],
    },
  },
  {
    timestamps: {
      createdAt: true,
    },
  }
);

export const carritoModel = mongoose.model("carritos", carritoSchema);
