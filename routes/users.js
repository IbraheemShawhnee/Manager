import express from "express";
const router = express.Router();
import catchAsync from "../utils/catchAsync.js";
import { isLoggedIn, isAdmin, isSuper } from "../middlewares/middleware.js";
import passport from "passport";
import * as users from "../controllers/users.js";

router.route("/register")
    .get(isLoggedIn, isAdmin, users.RenderRegisterForm)
    .post(isLoggedIn, isAdmin, catchAsync(users.Create))

router.route("/login")
    .get(users.RenderLoginPage)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: "/login", keepSessionInfo: true }), users.Login)

router.get("/logout", isLoggedIn, catchAsync(users.Logout))

router.route("/changePassword")
    .get(isLoggedIn, users.RenderChangePassowrdForm)
    .patch(isLoggedIn, catchAsync(users.PasswordChange))

router.patch("/changePassword/:id", isLoggedIn, isSuper, catchAsync(users.PasswordSet))

router.patch("/updatePermissions/:id", isLoggedIn, isSuper, catchAsync(users.UpdatePermissions))


export default router;