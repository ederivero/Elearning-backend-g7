import express from "express";
import { departamentosRouter } from "./routes/departamentos.routes.js";
import { trabajadoresRouter } from "./routes/trabajadores.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(departamentosRouter);
app.use(trabajadoresRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`); // backtips
});
