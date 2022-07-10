const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const { validatePayee } = require("../middlewares/validations");
const payees = require("../controllers/payees");

router.route('/')
    //	Index - GET
    .get(catchAsync(payees.all))
    //	Create - POST
    .post(validatePayee, catchAsync(payees.create))

router.route("/:payeeID")
    //	Show - GET
    .get(catchAsync(payees.view))
    //	Update - PUT
    .put(validatePayee, catchAsync(payees.update))
    //	Destory - DELETE
   .delete (catchAsync(payees.delete))



module.exports = router;