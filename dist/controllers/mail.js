"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/controllers/mail.ts
var mail_exports = {};
__export(mail_exports, {
  ping: () => ping,
  sendEmail: () => sendEmail
});
module.exports = __toCommonJS(mail_exports);
var import_nodemailer = __toESM(require("nodemailer"));
var sendEmail = (req, res) => __async(void 0, null, function* () {
  const mailing = {
    /* service to send emails */
    host: process.env.SMTP_HOST,
    /* email used by company to send emails (email for send these emails) */
    user: process.env.SMTP_EMAIL_USER,
    /* pass provided by app pass google */
    pass: process.env.SMTP_EMAIL_PASS,
    /* company contact email */
    emailTo: process.env.SMTP_EMAIL_TO
  };
  const mailInfo = {
    name: req.body.personName,
    from: req.body.emailToReply,
    telephone: req.body.telephone,
    message: req.body.message
  };
  if (Object.entries(mailInfo).some((field) => typeof field[1] === "undefined")) {
    return res.status(400).json({
      error: {
        message: "Preencha todos os campos"
      }
    });
  }
  let transporter = import_nodemailer.default.createTransport({
    host: mailing.host,
    port: 587,
    secure: false,
    auth: {
      user: mailing.user,
      pass: mailing.pass
    }
  });
  const mail = {
    from: `${mailInfo.name} <${mailInfo.from}>`,
    to: `${mailing.emailTo}`,
    subject: `Contato pelo formul\xE1rio do site (telefone: ${mailInfo.telephone})`,
    text: mailInfo.message,
    html: `<p>${mailInfo.message.replace("\n", "<br/><br/>")}</p>`
  };
  try {
    let info = yield transporter.sendMail(mail);
    res.status(200).json({ "Sended info feedback: ": info });
  } catch (error) {
    res.status(400).json({ error });
  }
});
var ping = (req, res) => __async(void 0, null, function* () {
  return res.json({ pong: true });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ping,
  sendEmail
});
