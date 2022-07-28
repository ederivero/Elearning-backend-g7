import nodemailer from "nodemailer";
//                   SERVIDOR        | PUERTO
// outlook >   outlook.office365.com | 587
// hotmail >   smtp.live.com         | 587
// gmail   >   smtp.gmail.com        | 587
// icloud >    smtp.mail.me.com      | 587
// yahoo >     smtp.mail.yahoo.com   | 587
const cliente = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const validarCorreo = async ({ destinatario, nombre, token }) => {
  try {
    const resultado = await cliente.sendMail({
      from: process.env.EMAIL,
      to: destinatario,
      subject: "Valida tu correo para la APP de backend",
      text: `Hola ${nombre} por favor valida tu correo haciendo click en el siguiente enlace: http://mifront.com?token=${token}`,
    });

    console.log(resultado);
  } catch (error) {
    console.log(error.message);
  }
};
