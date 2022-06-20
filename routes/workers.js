const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isSuper, validateUser } = require("../middleware");
const workers = require("../controllers/workers");

//  Index - GET
router.get('/', catchAsync(workers.all))

//	New - GET
router.get("/new", workers.renderNewForm)

router.route("/:id")
    //	Show - GET
    .get(catchAsync(workers.view))
    //	Update - PUT
    .put(validateUser, catchAsync(workers.update))
    //	Destory - DELETE
    .delete(isSuper, catchAsync(workers.delete))

//	Edit - GET
router.get("/:id/edit", catchAsync(workers.renderEditForm))



module.exports = router;