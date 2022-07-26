import express from "express";

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`); // backtips
});
