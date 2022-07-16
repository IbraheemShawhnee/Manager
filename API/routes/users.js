import express from "express";
const router = express.Router();
import catchAsync from "express-async-handler";
import passport from "passport";
import * as users from "../controllers/users.js";
import { isLoggedIn, isAdmin, isSuper } from "../middlewares/middleware.js";

router.route("/checkUsername")
    .post(isLoggedIn, isAdmin, catchAsync(users.CheckUsername))

router.route("/register")
    .post(isLoggedIn, isAdmin, catchAsync(users.Create))

router.route("/login")
    .get(users.CheckAuthentication)
    .post(passport.authenticate('local', {
        failureRedirect: "/api/login/failed",
    }), users.SuccessLogin);

router.route("/me")
    .get(users.getMe)


router.route("/login/failed")
    .get(users.FailedLogin);

router.route("/logout")
    .get(isLoggedIn, users.Logout)

router.route("/changePassword")
    .patch(isLoggedIn, catchAsync(users.PasswordChange))

// router.patch("/changePassword/:id", isLoggedIn, isSuper, catchAsync(users.PasswordSet))

// router.patch("/updatePermissions/:id", isLoggedIn, isSuper, catchAsync(users.UpdatePermissions))

export default router;