const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAdmin, isSuper } = require('../middlewares/middleware');
const passport = require("passport");
const users = require("../controllers/users");

router.route("/register")
    .get(isLoggedIn, isAdmin, users.renderRegisterForm)
    .post(isLoggedIn, isAdmin, catchAsync(users.create))

router.route("/login")
    .get(users.renderLoginPage)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: "/login", keepSessionInfo: true }),
        // function (req, res, next) {
        //     console.log(req.body.username)
        //     console.log(req.body.password)
        //     next();
        // },
        users.login
    );

router.get("/logout", isLoggedIn, catchAsync(users.logout))

router.route("/changePassword")
    .get(isLoggedIn, users.renderChangePassowrdForm)
    .patch(isLoggedIn, catchAsync(users.passwordChange))

router.patch("/changePassword/:id", isLoggedIn, isSuper, catchAsync(users.passwordSet))

router.patch("/updatePermissions/:id", isLoggedIn, isSuper, catchAsync(users.updatePermissions))


module.exports = router;