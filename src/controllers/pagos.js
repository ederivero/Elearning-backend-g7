import axios from "axios";
import mercadopago from "mercadopago";
import { carritoModel } from "../models/carritos.js";
import { productoModel } from "../models/productos.js";

export const crearUsuarioDePrueba = async (req, res) => {
  try {
    const base_url = "https://api.mercadopago.com";
    const body = req.body;
    const test_user = await axios.post(`${base_url}/users/test_user`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    });

    return res.status(200).json({
      message: "El usario de prueba se creo exitosamente",
      result: test_user.data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      result: null,
    });
  }
};

export const crearPreferencia = async (req, res) => {
  try {
    const base_url = "https://api.mercadopago.com";
    const body = req.body;
    const payments = await axios.post(
      `${base_url}/checkout/preferences`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );

    return res.status(200).json({
      message: "El usario de prueba se creo exitosamente",
      result: payments.data,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      result: null,
    });
  }
};

export const crearPago = async (req, res) => {
  const { user } = req;

  const carrito = await carritoModel.findOne({ usuarioId: user._id });

  const items = await Promise.all(
    carrito.detalle.map(async (detalle) => {
      const producto = await productoModel.findById(detalle.productoId);
      return {
        id: producto._id,
        title: producto.nombre,
        picture_url: producto.foto,
        quantity: detalle.cantidad,
        currency_id: "PEN",
        unit_price: +producto.precio.toString(),
      };
    })
  );

  const preferencia = await mercadopago.preferences.create({
    auto_return: "approved", // esto redireccionara automaticamente cuando el pago sea aprobado,
    back_urls: {
      success: "http://www.google.com", // la url si el pago es exitoso se hara el redireccionamiento
      failure: "http://www.tecsup.edu.pe", // si el pago no fue exitosoa se hara el rediccionamiento
      pending: "http://www.example.com", // si aun no se realizo el pago por que fue seleccionada la opcion de pago contra entrega o PagoEfectivo
    },
    payer: {
      name: user.nombre,
      surname: user.apellido,
      email: "test_user_63274575@testuser.com", // user.email NOTA: solamente usar el correo del usuario cuando se use alguna otra token que no sea la de la certificacion mientras tanto usar ese correo definido
      address: {
        // completamente opcional
        street_name: user.direcciones[0]?.calle,
        street_number: +user.direcciones[0]?.numero,
        zip_code: "04002",
      },
    }, // informacion de la persona que va a pagar
    items,
    notification_url:
      "https://b77a-190-236-76-55.ngrok.io/mercado-pago-notificaciones", // colocamos la url en la cual mercado pago va a enviar la informacion en tiempo real sobre esta preferencia , mercado pago la conoce como IPN (Instant Payment Notification)
  });
  console.log(carrito);

  console.log(preferencia);

  return res.json({
    message: "el link es",
    result: preferencia,
  });
};

export const notificacionesMercadoPago = async (req, res) => {
  console.log("el body es:");
  console.log(req.body);
  console.log("los parametros son:");
  console.log(req.params);
  console.log("los query params son:");
  console.log(req.query);

  return res.status(200).send();
};
