// forma de usar las librerias usando ECMAScript
import express from "express";
import dotenv from "dotenv";
// forma de usar las librerias usando CommonJs
// const express = require("express");

// Buscara el archivo .env y seteara las variables definidas en ese archivo como variables de entorno
dotenv.config();

const servidor = express();
const PORT = process.env.PORT; // esto generalmente es 3000 PERO puede ser cualquier valor

// indicamos que nuestro servidor podra aceptar y entender la informacion enviada en formato JSON
servidor.use(express.json());

const categories = [
  {
    name: "Zapatos",
    description: "Zapatos para hombres, mujeres, niños y niñas",
  },
];

servidor.get("/", (req, res) => {
  res.status(200).json({
    message: "Bienvenido a mi primera API",
  });
});

servidor
  .route("/categories")
  .get((req, res) => {
    return res.status(200).json({ categories });
  })
  .post((req, res) => {
    const category = req.body;

    // agregara la nueva categoria al listado de categorias
    categories.push(category);

    return res.status(201).json({
      message: "Category created successfully",
      content: category,
    });
  });

servidor.route("/categories/:id").get((req, res) => {
  console.log(req.params);
  // En base al id dado por la URL buscar en la lista de categorias si existe, si no existe indicar en el message que la categoria no existe, caso contrario devolver la categoria, NOTA: usar la posicion de la lista como el ID
  return res.json({
    message: "La categoria es",
  });
});

servidor.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});
