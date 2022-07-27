import _ from "lodash";

export const departamentoRequestDTO = (body) => {
  const errores = [];

  if (_.isNil(body.nombre)) {
    errores.push("Falta el nombre");
  }

  if (errores.length !== 0) {
    throw new Error(errores); // python > raise new Exception
  } else {
    return body;
  }
};
