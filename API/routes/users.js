const express = require("express");
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');
const passport = require("passport");
const users = require("../controllers/users");
const { isLoggedIn, isAdmin, isSuper } = require("../middlewares/middleware");

router.route("/checkUsername")
    .post(isLoggedIn, isAdmin, catchAsync(users.checkUsername))

router.route("/register")
    .post(isLoggedIn, isAdmin, catchAsync(users.create))

router.route("/login")
    .get(users.checkAuthentication)
    .post(passport.authenticate('local', {
        failureRedirect: "/login",
    }), users.successLogin);

router.route("/login/failed")
    .get(users.failedLogin);

router.route("/logout")
    .get(isLoggedIn, users.logout)

router.route("/changePassword")
    .patch(isLoggedIn, catchAsync(users.passwordChange))

router.patch("/changePassword/:id", isLoggedIn, isSuper, catchAsync(users.passwordSet))

router.patch("/updatePermissions/:id", isLoggedIn, isSuper, catchAsync(users.updatePermissions))

module.exports = router;