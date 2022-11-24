import express from "express"
import { isLoggedIn, isAdmin } from "./middlewares/middleware.js";
const router = express.Router();

// Routes and Authorizations
import billsRoutes from "./routes/bills.js";
import workersRoutes from "./routes/workers.js";
import logsRoutes from "./routes/logs.js";
import payeesRoutes from "./routes/payees.js";
import chequesRoutes from "./routes/cheques.js";
import usersRoutes from "./routes/users.js";


router.get('/express_backend', (req, res) => {
    return res.status(200).json({
        message: "Back-End server is up and running..."
    });
});

//	Routes
router.use("/bills",isLoggedIn, isAdmin, billsRoutes);
router.use("/payees",isLoggedIn, isAdmin, payeesRoutes);
router.use("/workers",isLoggedIn, isAdmin, workersRoutes);
router.use("/logs",isLoggedIn, logsRoutes)
router.use("/cheques",isLoggedIn, isAdmin, chequesRoutes);
router.use("/", usersRoutes);
router.route("*")
    .all((req, res)=>{
        return res.status(404).json({
            message: "This page doesn't exist!"
        });
    })


export default router;