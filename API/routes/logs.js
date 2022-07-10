const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const { validateLog } = require("../middlewares/validations");
const { isAdmin } = require("../middlewares/middleware");
const logs = require("../controllers/logs");


router.route('/')
    //	Index - GET
    .get(catchAsync(logs.all))
    //	Create - POST
    .post(validateLog, isAdmin, catchAsync(logs.create))

router.get("/myLogs", catchAsync(logs.mine))

router.route("/:logID")
    //	Show - GET
    .get(catchAsync(logs.view))
    //	Update - PUT
    .put(isAdmin, validateLog, catchAsync(logs.update))
    //	Destory - DELETE
    .delete(isAdmin, catchAsync(logs.delete))


module.exports = router;