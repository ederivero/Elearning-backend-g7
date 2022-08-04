import _ from "lodash";
import jwt from "jsonwebtoken";

// middleware > intermediario que sirve para hacer un trabajo previo al controlador final
export const verificarToken = (req, res, next) => {
  if (_.isNil(req.headers.authorization)) {
    // valido que me envien los headers de authorization
    return res.status(401).json({
      message: "Se necesita una token para realizar esta peticion",
    });
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer asdasdasdasd.asdasdasdasd.asdasdasds"
    if (_.isNil(token)) {
      throw new Error("No hay token");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);

    next();
  } catch (error) {
    return res.status(400).json({
      message: "Token invalida",
      content: error.message,
    });
  }
};
