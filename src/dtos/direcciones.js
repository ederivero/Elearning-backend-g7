import _ from "lodash";

export const direccionRequestDTO = (data) => {
  const errores = [];

  if (_.isNil(data.calle)) {
    errores.push("Falta la calle");
  }

  if (_.isNil(data.numero)) {
    errores.push("Falta el numero");
  }

  if (_.isNil(data.referencia)) {
    errores.push("Falta la referencia");
  }

  if (errores.length !== 0) {
    throw new Error(errores);
  } else {
    return data;
  }
};
