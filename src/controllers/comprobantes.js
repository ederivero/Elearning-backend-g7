import { ProductoModel } from "../models/productos.js";
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

  // la serie deberia de ser una tabla en la bd en la cual el contador pudiese modificar el valor segun sem necesite
  const serie = tipo_de_comprobante === 1 ? "F001" : "B001";

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
    (new Date().getMonth() < 10
      ? "0" + new Date().getMonth()
      : new Date().getMonth()) +
    "-" +
    new Date().getFullYear();

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
  };
};
