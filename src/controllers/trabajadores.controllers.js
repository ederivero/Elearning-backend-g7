import { trabajadoresRequestDTO } from "../dtos/trabajadores.dto.js";
import cryptoJs from "crypto-js";
import bcryptjs from "bcryptjs";
import { PrismaConnector } from "../prisma.js";
import { validarCorreo } from "../utils/correos.js";

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

export const cambiarPassword = (req, res) => {};
