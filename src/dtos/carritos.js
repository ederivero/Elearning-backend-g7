import validator from "validator";
import _ from "lodash";
import mongoose from "mongoose";

export const carritoRequestDTO = (data) => {
  const errores = [];

  //   if (_.isNil(data.usuarioId)) {
  //     errores.push("usuarioId es requerido");
  //   }

  if (_.isNil(data.productoId)) {
    errores.push("productoId es requerido");
  }

  // https://mongoosejs.com/docs/migrating_to_6.html#simplified-isvalidobjectid-and-separate-isobjectidorhexstring
  //   if (
  //     !_.isNil(data.usuarioId) &&
  //     !mongoose.Types.ObjectId.isValid(data.usuarioId)
  //   ) {
  //     errores.push("usuarioId no es un objectId valido");
  //   }

  // https://mongoosejs.com/docs/api/mongoose.html#mongoose_Mongoose-isValidObjectId
  if (!_.isNil(data.productoId) && !mongoose.isValidObjectId(data.productoId)) {
    errores.push("productoId no es un objectId valido");
  }

  if (errores.length !== 0) {
    throw new Error(errores);
  } else {
    return data;
  }
};
