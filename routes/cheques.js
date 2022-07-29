import express from "express";
const router = express.Router();
import catchAsync from "../utils/catchAsync.js";
import { validateCheque } from "../middlewares/validations.js";
import * as cheques from "../controllers/cheques.js";

//		CHEQUES
//	Index - GET
router.get("/", catchAsync(cheques.All))

//	CANCELLED - GET
router.get("/cancelled", catchAsync(cheques.Cancelled))

//	DELETED - GET
router.get("/deleted", catchAsync(cheques.Deleted))

//	New - GET
router.get("/new", catchAsync(cheques.RenderNewForm))

//	Create - POST
router.post("/", validateCheque, catchAsync(cheques.Create))

//	Show - GET
router.get("/:chequeID", catchAsync(cheques.View))

//	Edit - GET
router.get("/:chequeID/edit", catchAsync(cheques.RenderEditForm))

//	Update - PUT
router.put("/:chequeID", validateCheque, catchAsync(cheques.Update))

//	Destory - DELETE
router.delete("/:chequeID", catchAsync(cheques.Delete))

export default router;