import prisma from "@prisma/client";
import _ from "lodash";
import validator from "validator";

export const trabajadoresRequestDTO = (data) => {
  const errores = [];

  if (_.isNil(data.nombre)) {
    errores.push("Falta el nombre");
  }

  if (_.isNil(data.apellido)) {
    errores.push("Falta el apellido");
  }

  if (_.isNil(data.email)) {
    errores.push("Falta el email");
  }

  if (!_.isNil(data.email) && !validator.isEmail(data.email)) {
    errores.push("Email invalido");
  }

  if (_.isNil(data.password)) {
    errores.push("Falta la password");
  }

  if (_.isNil(data.rol)) {
    errores.push("Falta el rol");
  }

  // Metodo para principiantes
  /*
  if (
    !_.isNil(data.rol) &&
    (data.rol !== prisma.ROL_TRABAJADOR.GERENTE ||
      data.rol !== prisma.ROL_TRABAJADOR.OBRERO ||
      data.rol !== prisma.ROL_TRABAJADOR.PRACTICANTE ||
      data.rol !== prisma.ROL_TRABAJADOR.SUPERVISOR)
  ) {
    errores.push(
      "Rol incorrecto, sus valores son 'GERENTE', 'OBRERO', 'PRACTICANTE', 'SUPERVISOR'"
    );
  }
  */

  if (!_.isNil(data.rol)) {
    const roles = Object.values(prisma.ROL_TRABAJADOR);
    // const roles2 = [
    //   prisma.ROL_TRABAJADOR.GERENTE,
    //   prisma.ROL_TRABAJADOR.OBRERO,
    //   prisma.ROL_TRABAJADOR.PRACTICANTE,
    //   prisma.ROL_TRABAJADOR.SUPERVISOR,
    // ];
    const filtro = roles.filter((rol) => rol === data.rol);
    if (filtro.length === 0) {
      let mensaje = "Rol incorrecto, sus valores son: ";

      roles.forEach((rol) => {
        mensaje += `'${rol}' `;
      });
      errores.push(mensaje);
    }
  }

  if (errores.length !== 0) {
    throw new Error(errores);
  } else {
    return data;
  }
};

export const cambiarPasswordRequestDTO = (data) => {
  // validar que me envie lo siguiente {email:'..', antiguaPassword: '..' , nuevaPassword: '..'}
  // ademas validar que el 'email' sea un correo valido
  const errores = [];
  if (_.isNil(data.email)) {
    errores.push("Falta el email");
  }

  if (_.isNil(data.antiguaPassword)) {
    errores.push("Falta la antiguaPassword");
  }

  if (_.isNil(data.nuevaPassword)) {
    errores.push("Falta la nuevaPassword");
  }

  if (!_.isNil(data.email) && !validator.isEmail(data.email)) {
    errores.push("Email Invalido");
  }

  if (errores.length !== 0) {
    throw new Error(errores);
  } else {
    return data;
  }
};
