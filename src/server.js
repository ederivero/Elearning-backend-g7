import express from "express";
import mongoose from "mongoose";
import { productoRouter } from "./routes/productos.js";
import { usuarioRouter } from "./routes/usuarios.js";
import { direccionRouter } from "./routes/direcciones.js";
import { pagosRouter } from "./routes/pagos.js";
import { carritoRouter } from "./routes/carritos.js";
import mercadopago from "mercadopago";

// access_token > token que indicara a que negocio pertenece esta pasarela de pagos, servira para que cuando se realize una venta MP sepa a quien enviar el dinero
// integrator_id > es el identificador que obtendremos luego de realizar la certificacion para que MP sepa que desarrollador realizo esta integracion
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
  integrator_id: process.env.MP_INTEGRATOR_ID, // opcional
});

const app = express();

app.use(express.json()); // para indicar que la aplicacion de express pueda entender y convertir la informacion que llega del front mediante un formato JSON

const port = process.env.PORT ?? 3000; // nullish coalescing operator

app.use(productoRouter);
app.use(usuarioRouter);
app.use(direccionRouter);
app.use(pagosRouter);
app.use(carritoRouter);

mongoose
  .connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 3000,
  })
  .then((value) => {
    console.log("Base de datos conectada correctamente");
    app.listen(port, () => {
      console.log(
        `Servidor corriendo en el puerto ${port}: http://localhost:${port}`
      );
    });
  })
  .catch((error) => {
    console.error("Error al conectarse a la base de datos");
  });
