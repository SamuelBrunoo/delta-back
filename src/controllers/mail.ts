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
    // some field isnt provided. Return Error
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
  })

  const mail: MailOptions = {
    from: `${mailInfo.name} <${mailInfo.from}>`,
    to: `${mailing.emailTo}`,
    subject: `Contato pelo formulário do site (telefone: ${mailInfo.telephone})`,
    text: mailInfo.message,
    html: `<p>${mailInfo.message.replace('\n', '<br/><br/>')}</p>`,
  }

  try {
    let info = await transporter.sendMail(mail)

    res.status(200).json({ "Sended info feedback: ": info })
  } catch (error) {
    res.status(400).json({ error })
  }
}

export const ping = async (req: Request, res: Response) => {
  return res.json({ pong: true })
}