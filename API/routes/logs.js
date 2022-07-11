const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const { validateLog } = require("../middlewares/validations");
const { isAdmin } = require("../middlewares/middleware");
const logs = require("../controllers/logs");


router.route('/')
    .get(catchAsync(logs.all))
    .post(validateLog, isAdmin, catchAsync(logs.create))

router.get("/myLogs", catchAsync(logs.mine))

router.route("/:logID")
    .get(catchAsync(logs.view))
    .put(isAdmin, validateLog, catchAsync(logs.update))
    .delete(isAdmin, catchAsync(logs.delete))


module.exports = router;