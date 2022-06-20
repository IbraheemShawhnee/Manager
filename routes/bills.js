const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const bills = require("../controllers/bills");
const { validateBill } = require("../middleware");

router.route('/')
    //	Index - GET
    .get(catchAsync(bills.all))
    //	Create - POST
    .post(validateBill, catchAsync(bills.create))

//	New - GET
router.get("/new", (bills.renderNewForm))

router.route("/:id")
    //	Show - GET
    .get(catchAsync(bills.view))
    //	Update - PUT
    .put(validateBill, catchAsync(bills.update))
    //	Destory - DELETE
    .delete(catchAsync(bills.delete))

//	Edit - GET
router.get("/:id/edit", catchAsync(bills.renderEditForm))

module.exports = router;