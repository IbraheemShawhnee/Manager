const express = require("express");
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');
const passport = require("passport");
const users = require("../controllers/users");

router.route("/checkUsername")
    .post(catchAsync(users.checkUsername))

router.route("/register")
    .post(catchAsync(users.create))

router.route("/login")
    .post(passport.authenticate('local', {
        successRedirect: "/api/login/success",
        failureRedirect: "/api/login/failed"
    }));

router.route("/login/success")
    .get(users.successLogin);

router.route("/login/failed")
    .get(users.failedLogin);

router.route("/logout")
    .get(users.logout)

// router.route("/changePassword")
//     .get(isLoggedIn, users.renderChangePassowrdForm)
//     .patch(isLoggedIn, catchAsync(users.passwordChange))

// router.patch("/changePassword/:id", isLoggedIn, isSuper, catchAsync(users.passwordSet))

// router.patch("/updatePermissions/:id", isLoggedIn, isSuper, catchAsync(users.updatePermissions))

module.exports = router;