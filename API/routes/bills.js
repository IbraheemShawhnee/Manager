const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const bills = require("../controllers/bills");
const { validateBill } = require("../middlewares/validations");

router.route('/')
    .get(catchAsync(bills.all))
    // .post(validateBill, catchAsync(bills.create))

router.route("/:id")
    //	Show - GET
    .get(catchAsync(bills.view))
    //	Update - PUT
    .put(validateBill, catchAsync(bills.update))
    //	Destory - DELETE
    .delete(catchAsync(bills.delete))

module.exports = router;