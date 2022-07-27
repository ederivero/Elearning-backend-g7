import express from "express";
import { departamentosRouter } from "./routes/departamentos.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(departamentosRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`); // backtips
});
