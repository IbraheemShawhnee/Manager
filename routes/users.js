const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAdmin } = require('../middleware');
const passport = require("passport");
const users = require("../controllers/users");

router.route("/register")
    .get(isLoggedIn, isAdmin, users.renderRegisterForm)
    .post(isLoggedIn, isAdmin, catchAsync(users.create))

router.route("/login")
    .get(users.renderLoginPage)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: "/login", keepSessionInfo: true }), users.login)

router.get("/logout", isLoggedIn, catchAsync(users.logout))

module.exports = router;