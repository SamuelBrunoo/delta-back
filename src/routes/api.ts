import { Router, Request, Response } from "express"
import * as MailController from "../controllers/mail"


const routes = Router()

routes.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    hello: "hi"
  })
})
routes.post('/api/sendemail', MailController.sendEmail)


export default routes