const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const bills = require("../controllers/bills");
const { validateBill } = require("../middlewares/validations");

router.route('/')
    .get(catchAsync(bills.all))
    .post(validateBill, catchAsync(bills.create))

router.route("/:id")
    .get(catchAsync(bills.view))
    .put(validateBill, catchAsync(bills.update))
    .delete(catchAsync(bills.delete))

module.exports = router;