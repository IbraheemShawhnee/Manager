if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const PORT = process.env.PORT || 80

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
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

//	Routes
router.use("/bills",isLoggedIn, isAdmin, billsRoutes);
router.use("/payees",isLoggedIn, payeesRoutes);
router.use("/workers",isLoggedIn, workersRoutes);
router.use("/logs",isLoggedIn, logsRoutes)
router.use("/cheques",isLoggedIn, chequesRoutes);
router.use("/", usersRoutes);


module.exports = router;