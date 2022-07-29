import express from "express";
const router = express.Router();
import catchAsync from "../utils/catchAsync.js";
import { validatePayee } from "../middlewares/validations.js";
import * as payees from "../controllers/payees.js";

router.route('/')
    //	Index - GET
    .get(catchAsync(payees.All))
    //	Create - POST
    .post(validatePayee, catchAsync(payees.Create))

//	New - GET
router.get("/new", payees.RenderNewForm)

router.route("/:payeeID")
    //	Show - GET
    .get(catchAsync(payees.View))
    //	Update - PUT
    .put(validatePayee, catchAsync(payees.Update))
    //	Destory - DELETE
    .delete(catchAsync(payees.Delete))

//	Edit - GET
router.get("/:payeeID/edit", catchAsync(payees.RenderEditForm))


export default router;