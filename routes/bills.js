import express from "express";
const router = express.Router();
import catchAsync from "../utils/catchAsync.js";
import * as bills from "../controllers/bills.js";
import { validateBill } from "../middlewares/validations.js";

router.route('/')
    //	Index - GET
    .get(catchAsync(bills.All))
    //	Create - POST
    .post(validateBill, catchAsync(bills.Create))

//	New - GET
router.get("/new", (bills.RenderNewForm))

router.route("/:id")
    //	Show - GET
    .get(catchAsync(bills.View))
    //	Update - PUT
    .put(validateBill, catchAsync(bills.Update))
    //	Destory - DELETE
    .delete(catchAsync(bills.Delete))

//	Edit - GET
router.get("/:id/edit", catchAsync(bills.RenderEditForm))

export default router;