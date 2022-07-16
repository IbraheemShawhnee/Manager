import express from "express";
const router = express.Router();
import catchAsync from "express-async-handler";
import { validateCheque } from "../middlewares/validations.js";
import * as cheques from "../controllers/cheques.js";


router.route("/")
    .get(catchAsync(cheques.All))
    .post(validateCheque, catchAsync(cheques.Create))

router.get("/cancelled", catchAsync(cheques.Cancelled))

router.get("/deleted", catchAsync(cheques.Deleted))

router.route("/:chequeID")
    .get(catchAsync(cheques.View))
    .put(validateCheque, catchAsync(cheques.Update))
    .delete(catchAsync(cheques.Delete))


export default router;