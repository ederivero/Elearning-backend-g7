import express from "express";
import mongoose from "mongoose";
import { productoRouter } from "./routes/productos.js";

const app = express();

app.use(express.json()); // para indicar que la aplicacion de express pueda entender y convertir la informacion que llega del front mediante un formato JSON

const port = process.env.PORT ?? 3000; // nullish coalescing operator

app.use(productoRouter);

mongoose
  .connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 3000,
  })
  .then((value) => {
    console.log("Base de datos conectada correctamente");
    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectarse a la base de datos");
  });
