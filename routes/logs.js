import express from "express";
const router = express.Router();
import catchAsync from "../utils/catchAsync.js";
import { validateLog } from "../middlewares/validations.js";
import { isAdmin } from "../middlewares/middleware.js";
import * as logs from "../controllers/logs.js";


router.route('/')
    //	Index - GET
    .get(catchAsync(logs.All))
    //	Create - POST
    .post(validateLog, isAdmin, catchAsync(logs.Create))

router.get("/myLogs", catchAsync(logs.Mine))

//	New - GET
router.get("/new", isAdmin, catchAsync(logs.RenderNewForn))

router.route("/:logID")
    //	Show - GET
    .get(catchAsync(logs.View))
    //	Update - PUT
    .put(isAdmin, validateLog, catchAsync(logs.Update))
    //	Destory - DELETE
    .delete(isAdmin, catchAsync(logs.Delete))

//	Edit - GET
router.get("/:logID/edit", isAdmin, catchAsync(logs.RenderEditForm))

export default router;