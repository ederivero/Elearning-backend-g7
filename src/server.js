import express from "express";
import mongoose from "mongoose";

const app = express();

const port = process.env.PORT ?? 3000; // nullish coalescing operator

mongoose
  .connect("mongodb://localhost:27017/ecommerce", {
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
