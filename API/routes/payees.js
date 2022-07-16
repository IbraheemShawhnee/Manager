import express from "express";
const router = express.Router();
import catchAsync from "express-async-handler";
import { validatePayee } from "../middlewares/validations.js";
import * as payees from "../controllers/payees.js";

router.route('/')
    .get(catchAsync(payees.All))
    .post(validatePayee, catchAsync(payees.Create))

router.route("/:payeeID")
    .get(catchAsync(payees.View))
    .put(validatePayee, catchAsync(payees.Update))
    .delete(catchAsync(payees.Delete))


export default router;