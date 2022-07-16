import express from "express";
const router = express.Router();
import catchAsync from "express-async-handler";
import { validateLog } from "../middlewares/validations.js"
import { isAdmin } from "../middlewares/middleware.js"
import * as logs from "../controllers/logs.js";


router.route('/')
    .get(isAdmin, catchAsync(logs.All))
    .post(validateLog, isAdmin, catchAsync(logs.Create))

router.get("/myLogs", (logs.Mine))

router.route("/:logID")
    .get(catchAsync(logs.View))
    .put(isAdmin, validateLog, catchAsync(logs.Update))
    .delete(isAdmin, catchAsync(logs.Delete))


export default router;