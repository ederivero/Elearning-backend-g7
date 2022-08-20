import axios from "axios";
import mercadopago from "mercadopago";
import { carritoModel } from "../models/carritos.js";
import { productoModel } from "../models/productos.js";
import { pedidoModel } from "../models/pedidos.js";

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

  if (carrito.detalle.length === 0) {
    return res.status(400).json({
      message: "No se puede crear un pago porque el carrito esta vacio",
    });
  }

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
      "https://384a-190-236-76-55.ngrok.io/mercado-pago-notificaciones", // colocamos la url en la cual mercado pago va a enviar la informacion en tiempo real sobre esta preferencia , mercado pago la conoce como IPN (Instant Payment Notification)
  });

  // Una vez creada la preferencia limpio los items del carrito para que ya la proxima ya no existan esos productos
  carrito.detalle = [];
  await carrito.save();

  // metodo basico
  let total = 0;
  items.forEach((item) => {
    total += item.quantity * item.unit_price;
  });

  // metodo usando reduce
  total = items.reduce((prevVal, curVal) => {
    return prevVal + curVal.quantity * curVal.unit_price;
  }, 0);
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  await pedidoModel.create({
    fecha: preferencia.body.date_created,
    total,
    estado: "CREADO",
    preferenceId: preferencia.body.id,
    usuarioId: user._id,
  });

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

  if (req.query.topic && req.query.topic === "merchant_order") {
    const { id } = req.query;
    // buscare la informacion de esa orden comercial
    const merchant_order = await mercadopago.merchant_orders.get(id);
    console.log(merchant_order.body.payments);
    const pedidoEncontrado = await pedidoModel.findOne({
      preferenceId: merchant_order.body.preference_id,
    });

    if (pedidoEncontrado) {
      pedidoEncontrado.merchantOrderId = merchant_order.body.id;

      const payment = merchant_order.body.payments[0];
      // la primera vez que llega el merchant_order sera cuando se cree la orden comercial pero ahi no se realizara ningun pago por lo que estara undefined el payment y para evitar que nos lance error validaremos si el payment no es indefinido para luego poder ingresar a su propiedad status
      if (payment && payment.status === "approved") {
        pedidoEncontrado.estado = "PAGADO";
      }
      if (payment && payment.status === "pending") {
        pedidoEncontrado.estado = "PENDIENTE";
      }
      if (payment && payment.status === "rejected") {
        pedidoEncontrado.estado = "FALLIDO";
      }
      await pedidoEncontrado.save();
    } else {
      // envio de correo a soporte@empresa.com
      console.log(
        `El pedido con preference id ${merchant_order.body.preference_id} no esta registrado en los pedidos!!`
      );
    }
  }
  return res.status(200).send();
};
