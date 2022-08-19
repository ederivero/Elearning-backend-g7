import mongoose from "mongoose";
import { usuarioModel } from "./usuarios.js";

const pedidoSchema = new mongoose.Schema(
  {
    fecha: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    total: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    estado: {
      type: mongoose.Schema.Types.String,
      enum: ["CREADO", "PAGADO", "FALLIDO", "PENDIENTE"],
      required: true,
    },
    preferenceId: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    merchantOrderId: {
      type: mongoose.Schema.Types.String,
    },
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      validate: async (data) => {
        const usuario = await usuarioModel.findById(data);
        if (usuario) {
          return usuario;
        } else {
          throw new Error();
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

export const pedidoModel = mongoose.model("pedidos", pedidoSchema);
