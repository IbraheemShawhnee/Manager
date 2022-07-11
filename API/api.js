const express = require("express");
const { isLoggedIn, isAdmin } = require('./middlewares/middleware');
const router = express.Router();

// Routes and Authorizations
const billsRoutes = require("./routes/bills")
const workersRoutes = require("./routes/workers")
const logsRoutes = require("./routes/logs")
const payeesRoutes = require("./routes/payees")
const chequesRoutes = require("./routes/cheques")
const usersRoutes = require("./routes/users")


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


module.exports = router;