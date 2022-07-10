const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const { validateUser } = require("../middlewares/validations");
const { isSuper } = require("../middlewares/middleware");
const workers = require("../controllers/workers");

//  Index - GET
router.get('/', catchAsync(workers.all))


router.route("/:id")
    //	Show - GET
    .get(catchAsync(workers.view))
    //	Update - PUT
    .put(validateUser, catchAsync(workers.update))
    //	Destory - DELETE
    .delete(isSuper, catchAsync(workers.delete))


module.exports = router;