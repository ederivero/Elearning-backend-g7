import express from "express";
import { PrismaConnector } from "./prisma.js";

const app = express();
const PORT = process.env.PORT;

app.get("/departamentos", async (req, res) => {
  try {
    // SELECT * FROM departamentos;
    const resultado = await PrismaConnector.departamento.findMany();
    console.log(resultado);
    console.log("hola");
    return res.json({
      message: "Hola",
    });
  } catch (razon) {
    return res.json({
      message: "Algo salio mal",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`); // backtips
});
