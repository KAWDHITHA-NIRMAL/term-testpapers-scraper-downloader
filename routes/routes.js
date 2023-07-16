import { Router } from "express";
import {urlController, mainController} from "../controllers/routeController.js"

 const routes = Router()

 routes.get('/:grade/:subject', urlController)
 routes.get('/', mainController)

 export default routes