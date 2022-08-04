import express from "express";
import { departamentosRouter } from "./routes/departamentos.routes.js";
import { trabajadoresRouter } from "./routes/trabajadores.routes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

// el metodo GET siempre podra ser accedido ya que el navegador usa este metodo
// metodo 1
app.use(
  cors({
    origin: ["http://miaplicacion.com"],
    methods: ["GET", "POST"],
    allowedHeaders: ["accept", "authorization", "content-type"],
  })
);

// metodo 2
const origenesPermitidos = ["http://miaplicacion.com"];

app.use(
  cors((req, cb) => {
    const corsOptions = { origin: false };
    // nullish coalescing operator https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
    if (origenesPermitidos.indexOf(req.header("Origin") ?? "") !== -1) {
      corsOptions.origin = true;
    }

    cb(null, corsOptions);
  })
);

app.use(express.json());

app.use(departamentosRouter);
app.use(trabajadoresRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`); // backtips
});
