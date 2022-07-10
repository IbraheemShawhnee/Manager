const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const { validateCheque } = require("../middlewares/validations");
const cheques = require("../controllers/cheques");

//		CHEQUES
//	Index - GET
router.get("/", catchAsync(cheques.all))

//	CANCELLED - GET
router.get("/cancelled", catchAsync(cheques.cancelled))

//	DELETED - GET
router.get("/deleted", catchAsync(cheques.deleted))

//	Create - POST
router.post("/", validateCheque, catchAsync(cheques.create))

//	Show - GET
router.get("/:chequeID", catchAsync(cheques.view))


//	Update - PUT
router.put("/:chequeID", validateCheque, catchAsync(cheques.update))

//	Destory - DELETE
router.delete("/:chequeID", catchAsync(cheques.delete))

module.exports = router;