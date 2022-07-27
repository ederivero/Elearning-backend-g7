import { PrismaConnector } from "../prisma.js";

export const getDepartamentos = async (req, res) => {
  try {
    const departamentos = await PrismaConnector.departamento.findMany();

    return res.json({
      result: departamentos,
      message: null,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al devolver los departamentos",
      result: error,
    });
  }
};
