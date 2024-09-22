import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const mail = `
    <h1>Incoming email from: </h1>
    <h2>${req.body.sender}</h2>
    <h3>${req.body.subject}</h3>
    <p>${req.body.message}</p>`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "feldmanaaron406@gmail.com",
        pass: "lnng jfmc vcty qpol",
      },
    });

    await transporter.sendMail({
      from: req.body.sender,
      to: "feldmanaaron406@gmail.com",
      subject: req.body.subject,
      html: mail,
    });

    res.send(200);
  }
}
