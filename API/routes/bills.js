import express from "express";
const router = express.Router();
import catchAsync from "express-async-handler";
import * as bills from "../controllers/bills.js";
import { validateBill } from "../middlewares/validations.js";

router.route('/')
    .get(catchAsync(bills.All))
    .post(validateBill, catchAsync(bills.Create))

router.route("/:id")
    .get(catchAsync(bills.View))
    .put(validateBill, catchAsync(bills.Update))
    .delete(catchAsync(bills.Delete))

export default router;