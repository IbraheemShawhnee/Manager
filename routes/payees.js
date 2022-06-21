const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { validatePayee } = require("../middlewares/validations");
const payees = require("../controllers/payees");

router.route('/')
    //	Index - GET
    .get(catchAsync(payees.all))
    //	Create - POST
    .post(validatePayee, catchAsync(payees.create))

//	New - GET
router.get("/new", payees.renderNewForm)

router.route("/:payeeID")
    //	Show - GET
    .get(catchAsync(payees.view))
    //	Update - PUT
    .put(validatePayee, catchAsync(payees.update))
    //	Destory - DELETE
   .delete (catchAsync(payees.delete))

//	Edit - GET
router.get("/:payeeID/edit", catchAsync(payees.renderEditForm))


module.exports = router;