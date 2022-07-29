import express from "express";
const router = express.Router();
import catchAsync from "../utils/catchAsync.js";
import { validateUser } from "../middlewares/validations.js";
import { isSuper } from "../middlewares/middleware.js";
import * as workers from "../controllers/workers.js";

//  Index - GET
router.get('/', catchAsync(workers.All))

//	New - GET
router.get("/new", workers.RenderNewForm)

router.route("/:id")
    //	Show - GET
    .get(catchAsync(workers.View))
    //	Update - PUT
    .put(validateUser, catchAsync(workers.Update))
    //	Destory - DELETE
    .delete(isSuper, catchAsync(workers.Delete))

//	Edit - GET
router.get("/:id/edit", catchAsync(workers.RenderEditForm))



export default router;