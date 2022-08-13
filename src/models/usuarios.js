// crear un schema de usuario en el cual se almacene lo siguiente: email(requerido), password(requerido), nombre, apellido, nacionalidad (PERUANO,VENEZOLANO,BOLIVIANO), fechaNacimiento(fecha_nacimiento),

import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const enumNacionalidad = ["PERUANO", "VENEZOLANO", "BOLIVIANO"];

const direccionSchema = new mongoose.Schema(
  {
    calle: {
      required: true,
      type: mongoose.Schema.Types.String,
    },
    numero: {
      required: true,
      type: mongoose.Schema.Types.String,
    },
    referencia: {
      required: true,
      type: mongoose.Schema.Types.String,
    },
    adicional: {
      type: mongoose.Schema.Types.String,
    },
  },
  {
    _id: false,
    // indicamos que queremos que en este schema se usen los campos de timestamp para poder generar de manera automatica la fecha de creacion y la fecha de actualizacion
    timestamps: {
      createdAt: "fecha_creacion",
      updatedAt: false,
    },
  }
);

const usuarioSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    index: true,
    unique: true, // va de la mano con las columnas que son indices
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
    set: (valor) => bcryptjs.hashSync(valor, 10),
  },
  nombre: {
    type: mongoose.Schema.Types.String,
  },
  apellido: {
    type: mongoose.Schema.Types.String,
  },
  nacionalidad: {
    type: mongoose.Schema.Types.String,
    enum: enumNacionalidad,
    required: true,
  },
  fechaNacimiento: {
    name: "fecha_nacimiento", // cambiara el nombre de nuestra columna en la bd
    type: mongoose.Schema.Types.Date,
  },
  direcciones: {
    type: [direccionSchema], // relacion de 1 - n en la cual un usuario tiene varias direcciones pero 1 direccion pertenece a 1 usuario
  },
  //   direcciones: [direccionSchema],
});

export const usuarioModel = mongoose.model("usuarios", usuarioSchema);
