import { ProductoModel } from "../models/productos.js";
import axios from "axios";

const nubefactRequest = axios.create({
  baseURL: process.env.NUBEFACT_URL,
  headers: {
    Authorization: process.env.NUBEFACT_TOKEN,
    "Content-Type": "application/json",
  },
});

export const crearComprobante = async (req, res) => {
  /*
    body : {
        "productos": [{
            "id": "123123123123",
            "cantidad": 10
        },{
            "id": "234545454",
            "cantidad": 2
        }],
        "cliente": {
            "tipo_documento": "DNI" | "RUC" | "NA",
            "numero_documento":"111111111",
            "nombre": "EDUARDO S.A.C.",
            "direccion": "calle girasol 123"
        },
        "tipo_de_comprobante": 1 | 2 | 3 | 4
    }
     */
  const { productos, cliente, tipo_de_comprobante } = req.body;

  try {
    if (productos.length === 0) {
      return res.status(400).json({
        message: "No se puede emitir un comprobante sin productos",
      });
    }

    let total = 0;
    const items = [];

    for (const producto of productos) {
      const productoEncontrado = await ProductoModel.findById(producto.id);
      // PARA ESTE CASO Si esta el precio incluido el IGV
      const subtotal =
        +productoEncontrado.precio.toString() * producto.cantidad;
      total += subtotal;
      const valor_unitario = +productoEncontrado.precio.toString() / 1.18; // formula para sacar el IGV a un producto

      const item = {
        unidad_de_medida: "NIU",
        codigo: productoEncontrado._id,
        descripcion: productoEncontrado.nombre,
        cantidad: producto.cantidad,
        valor_unitario,
        precio_unitario: +productoEncontrado.precio.toString(),
        subtotal: valor_unitario * producto.cantidad,
        tipo_de_igv: 1,
        igv: valor_unitario * producto.cantidad * 0.18,
        total: +productoEncontrado.precio.toString() * producto.cantidad,
        anticipo_regularizacion: false,
      };

      items.push(item);
    }

    // la serie deberia de ser una tabla en la bd en la cual el contador pudiese modificar el valor segun sem necesite
    const serie = tipo_de_comprobante === 1 ? "FFF1" : "BBB1";

    let cliente_tipo_de_documento;
    let cliente_numero_de_documento;
    let cliente_denominacion;
    let cliente_direccion;

    if (cliente.tipo_documento === "NA") {
      cliente_tipo_de_documento = "-";
      cliente_numero_de_documento = "";
      cliente_denominacion = "";
      cliente_direccion = "";
    } else {
      cliente_numero_de_documento = cliente.numero_documento;
      cliente_denominacion = cliente.nombre;
      cliente_direccion = cliente.direccion;

      if (cliente.tipo_documento === "DNI") {
        cliente_tipo_de_documento = "1";
      }
      if (cliente.tipo_documento === "RUC") {
        cliente_tipo_de_documento = "6";
      }
    }
    const fechaActual =
      (new Date().getDate() < 10
        ? "0" + new Date().getDate()
        : new Date().getDate()) +
      "-" +
      (new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1) +
      "-" +
      new Date().getFullYear();

    const total_gravada = total / 1.18;
    const total_igv = total - total_gravada;

    const dataNubefact = {
      operacion: "generar_comprobante",
      tipo_de_comprobante,
      serie,
      numero: 1, // CUIDADO!!! esto debe de extraerse de la tabla de la base de datos
      sunat_transaction: 1,
      cliente_tipo_de_documento,
      cliente_numero_de_documento,
      cliente_denominacion,
      cliente_direccion,
      fecha_de_emision: fechaActual,
      moneda: 1,
      porcentaje_de_igv: 18.0,
      total,
      total_gravada,
      total_igv,
      detraccion: false,
      enviar_automaticamente_a_la_sunat: true,
      enviar_automaticamente_al_cliente: false,
      formato_de_pdf: "TICKET", // "A4" | "A5" | "TICKET"
      items,
    };

    const respuesta = await nubefactRequest.post("/", dataNubefact);

    console.log(respuesta.data);

    return res.status(201).json({
      message: "Comprobante creado exitosamente",
      result: respuesta.data,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return res.status(400).json({
        message: "Error la buscar el comprobante",
        result: error.response.data,
      });
    }

    return res.status(400).json({
      message: "Error al crear el comprobante",
      result: error.message,
    });
  }
};

export const buscarComprobante = async (req, res) => {
  const { serie, numero } = req.query;
  // si la serie llega Fxxxx sera una Factura (1), si es Bxxxx sera una boleta (2)

  try {
    let tipo_de_comprobante = 0;
    if (serie[0] === "F") {
      tipo_de_comprobante = 1;
    }
    if (serie[0] === "B") {
      tipo_de_comprobante = 2;
    }

    const dataNubefact = {
      operacion: "consultar_comprobante",
      tipo_de_comprobante,
      serie,
      numero,
    };

    const respuesta = await nubefactRequest.post("/", dataNubefact);

    return res.status(200).json({
      message: null,
      result: respuesta.data,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return res.status(400).json({
        message: "Error la buscar el comprobante",
        result: error.response.data,
      });
    }

    return res.status(400).json({
      message: "Error la buscar el comprobante",
      result: error.message,
    });
  }
};

// NEXT STEPS: guardar el comprobante de pago en la base de datos (su serie, su numero) y ademas vincularlo con una orden de pedido y guardar el numero de serie y numero de comprobante para crear mas comprobante
