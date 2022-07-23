// forma de usar las librerias usando ECMAScript
import express from "express";
import dotenv from "dotenv";
// forma de usar las librerias usando CommonJs
// const express = require("express");

// Buscara el archivo .env y seteara las variables definidas en ese archivo como variables de entorno
dotenv.config();

const servidor = express();
const PORT = process.env.PORT; // esto generalmente es 3000 PERO puede ser cualquier valor

servidor.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});
