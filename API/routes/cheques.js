const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const { validateCheque } = require("../middlewares/validations");
const cheques = require("../controllers/cheques");


router.route("/")
    .get(catchAsync(cheques.all))
    .post(validateCheque, catchAsync(cheques.create))

router.route("/:chequeID")
    .get(catchAsync(cheques.view))
    .put(validateCheque, catchAsync(cheques.update))
    .delete(catchAsync(cheques.delete))

router.get("/cancelled", catchAsync(cheques.cancelled))

router.get("/deleted", catchAsync(cheques.deleted))


module.exports = router;