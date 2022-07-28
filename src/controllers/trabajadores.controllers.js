import {
  trabajadoresRequestDTO,
  cambiarPasswordRequestDTO,
} from "../dtos/trabajadores.dto.js";
import cryptoJs from "crypto-js";
import bcryptjs from "bcryptjs";
import { PrismaConnector } from "../prisma.js";
import { validarCorreo, cambioPassword } from "../utils/correos.js";

export const postTrabajador = async (req, res) => {
  try {
    const { password, ...data } = trabajadoresRequestDTO(req.body);
    const password_encriptada = bcryptjs.hashSync(password, 10);
    console.log(password_encriptada);

    const result = await PrismaConnector.trabajador.create({
      data: { ...data, password: password_encriptada },
    });

    const horaActual = new Date();

    const token = cryptoJs.AES.encrypt(
      JSON.stringify({
        id: result.id,
        caducidad: new Date(
          horaActual.getFullYear(),
          horaActual.getMonth(),
          horaActual.getDate(),
          horaActual.getHours() + 2
        ),
      }),
      process.env.LLAVE_ENCRIPTACION
    ).toString();

    await validarCorreo({
      destinatario: result.email,
      nombre: result.nombre,
      token,
    });

    return res.json({
      message: "Usuario registrado exitosamente",
      result,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear el usuario",
      result: error.message,
    });
  }
};

export const validarTrabajador = async (req, res) => {
  const { token } = req.body;
  try {
    const data = cryptoJs.AES.decrypt(
      token,
      process.env.LLAVE_ENCRIPTACION
    ).toString(cryptoJs.enc.Utf8);
    console.log(data);
    // la desencriptacion si es que la token es invalida retornara null entonces forzamos el error con el siguiente IF

    if (!data) {
      throw new Error("Token no valida");
    }

    const infoToken = JSON.parse(data);
    console.log(infoToken);
    if (infoToken.caducidad < new Date()) {
      throw new Error("La token ya vencio");
    }

    // busco el trabajador
    const trabajador = await PrismaConnector.trabajador.findUniqueOrThrow({
      where: { id: infoToken.id },
    });

    // verifico que no este validado
    if (trabajador.validado) {
      throw new Error("Usuario ya fue validado");
    }

    // lo valido
    await PrismaConnector.trabajador.update({
      data: { validado: true },
      where: { id: infoToken.id },
    });

    return res.json({
      message: "Trabajador validado exitosamente",
      result: null,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al validar la token",
      result: error.message,
    });
  }
};

export const cambiarPassword = async (req, res) => {
  try {
    const data = cambiarPasswordRequestDTO(req.body);

    const trabajador = await PrismaConnector.trabajador.findUniqueOrThrow({
      where: { email: data.email },
    });
    // TODO: que las contraseñas no pueden ser iguales la nueva que la anterior

    if (bcryptjs.compareSync(data.antiguaPassword, trabajador.password)) {
      const nuevaPassword = bcryptjs.hashSync(data.nuevaPassword);

      await PrismaConnector.trabajador.update({
        data: {
          password: nuevaPassword,
        },
        where: {
          email: data.email,
        },
      });

      await cambioPassword({
        destinatario: trabajador.email,
        nombre: trabajador.nombre,
      });
      return res.json({
        message: "Contraseña actualizada exitosamente",
        result: null,
      });
    } else {
      throw new Error("La contraseña es incorrecta");
    }
  } catch (error) {
    return res.json({
      message: "Error al actualizar la password",
      result: error.message,
    });
  }
};
