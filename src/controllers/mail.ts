import { Request, Response } from "express"
import nodemailer from "nodemailer"
import { MailOptions } from "nodemailer/lib/json-transport"


export const sendEmail = async (req: Request, res: Response) => {

  const mailing = {
    /* service to send emails */
    host: process.env.SMTP_HOST,
    /* email used by company to send emails (email for send these emails) */
    user: process.env.SMTP_EMAIL_USER,
    /* pass provided by app pass google */
    pass: process.env.SMTP_EMAIL_PASS,
    /* company contact email */
    emailTo: process.env.SMTP_EMAIL_TO,
  }

  const mailInfo = {
    name: req.body.personName as string,
    from: req.body.emailToReply as string,
    telephone: req.body.telephone as string,
    message: req.body.message as string,
  }

  if (
    Object.entries(mailInfo)
      .some(field => typeof field[1] === "undefined")
  ) {
    return res.status(400).json({
      error: {
        message: "Preencha todos os campos"
      }
    })
  }


  let transporter = nodemailer.createTransport({
    host: mailing.host,
    port: 587,
    secure: false,
    auth: {
      user: mailing.user,
      pass: mailing.pass,
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const mail: MailOptions = {
    from: mailInfo.from,
    to: mailing.emailTo,
    subject: "Formulário Site",
    text: mailInfo.message,
    html: `<p>Nome: ${mailInfo.name}<br/>E-mail: ${mailInfo.from}<br/>Telefone: ${mailInfo.telephone}<br/>Mensagem: ${mailInfo.message.replace('\n', '<br/><br/>')}</p><br/><br/><p>Esta mensagem foi enviada via formulário  do site.</p>`,
  }

  try {
    await transporter.sendMail(mail)

    res.status(200).json({ sended: true })
  } catch (error) {
    res.status(400).json({ sended: false, error })
  }
}

export const ping = async (req: Request, res: Response) => {
  return res.json({ pong: true })
}