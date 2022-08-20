import express from "express";
import { productoRouter } from "./routes/productos.js";
import { comprobanteRouter } from "./routes/comprobantes.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.use(productoRouter);
app.use(comprobanteRouter);

const PORT = process.env.PORT ?? 3000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Base de datos conectada exitosamente ");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo exitosamente en el puerto ${PORT} 💻`);
    });
  })
  .catch(() => {
    console.log("Error al conectarse a la base de datos 💀");
  });
