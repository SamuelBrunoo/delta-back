import { Router } from "express"
import * as MailController from "../controllers/mail"


const routes = Router()

routes.post('/sendemail', MailController.sendEmail)


export default routes