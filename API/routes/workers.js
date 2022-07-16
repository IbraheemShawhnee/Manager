import express from "express";
const router = express.Router();
import catchAsync from "express-async-handler";
import { validateUser } from "../middlewares/validations.js";
import { isSuper } from "../middlewares/middleware.js";
import * as workers from "../controllers/workers.js";

//  Index - GET
router.get('/', catchAsync(workers.All))

router.route("/:id")
    .get(catchAsync(workers.View))
    .put(validateUser, catchAsync(workers.Update))
    .delete(isSuper, catchAsync(workers.Delete))


export default router;