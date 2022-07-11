const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const { validatePayee } = require("../middlewares/validations");
const payees = require("../controllers/payees");

router.route('/')
    .get(catchAsync(payees.all))
    .post(validatePayee, catchAsync(payees.create))

router.route("/:payeeID")
    .get(catchAsync(payees.view))
    .put(validatePayee, catchAsync(payees.update))
    .delete (catchAsync(payees.delete))


module.exports = router;