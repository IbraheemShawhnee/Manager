import User from "../models/user.js";

export const RenderRegisterForm = ((req, res) => {
    res.render("users/register", { pageTitle: "Manager - Register" })
})

export const Create = async (req, res, next) => {
    try {
        let { name, email, phoneNumber, username, password } = req.body;
        if (email && !email.length) {
            email = null;
        }
        const user = new User({ name, email, phoneNumber, username });
        const newUser = await User.register(user, password);
        //  Auto sign-in after registering
        //  Disabled because only Admins can add users
        // req.login(newUser, err => {
        //     if(err) return next(err);
        //     req.flash("success", "Welcome a Borad!")
        //     return res.redirect("/");
        // })
        req.flash("success", "Worker Added Successfully")
        return res.redirect("/workers");
    } catch (err) {
        req.flash("error", err.message);
        return res.redirect("/register");
    }
}

export const RenderLoginPage = (req, res) => {
    if (req.user && req.isAuthenticated()) {
        req.flash('success', "You are already logged in!");
        return res.redirect("/")
    }
    res.render("users/login", {
        pageTitle: "Manager - Login"
    })
}

export const Login = (req, res) => {
    req.flash("success", "Welcome Back!");
    const redirectUrl = req.session.returnTo || "/";
    delete req.session.returnTo
    res.redirect(redirectUrl);
}

export const RenderChangePassowrdForm = ((req, res) => {
    res.render("users/changePassword", {
        pageTitle: "Manager - Change Password"
    })
})

export const PasswordChange = async (req, res, next) => {
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/changePassword");
        } else {
            user.changePassword(req.body.oldpassword, req.body.password, function (err) {
                if (err) {
                    if (err.name === 'IncorrectPasswordError') {
                        req.flash("error", "Incorrect Password");
                        return res.redirect("/changePassword");
                    } else {
                        req.flash("error", "Something went wrong!! Please try again after sometimes.");
                        return res.redirect("/changePassword");
                    }
                } else {
                    req.flash("success", "Password Changed Successfully")
                    return res.redirect("/");
                }
            })
        }

    });
}

export const PasswordSet = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
        req.flash("error", "User Not Found");
        return res.redirect("/workers");
    }
    try {
        await user.setPassword(req.body.password);
        await user.save();
        req.flash("success", "Password Changed Successfully")
        return res.redirect("/workers");
    } catch (err) {
        req.flash("error", err.message);
        return res.redirect("/workers");
    }
}

export const UpdatePermissions = async (req, res, next) => {
    const { id } = req.params;
    let { permissions } = req.body;
    if (!permissions) {
        permissions = {
            isAdmin: false,
            isSuper: false
        }
    } else {
        permissions.isAdmin = !!permissions.isAdmin;
        permissions.isSuper = !!permissions.isSuper;
    }
    const worker = await User.findByIdAndUpdate(id, { isAdmin: permissions.isAdmin, isSuper: permissions.isSuper }, { new: true, runValidators: true })
    if (!worker) {
        req.flash("error", "Cannot find that worker!");
        return res.redirect("/workers");
    }
    req.flash("success", "Permissions Updated Successfully");
    res.redirect("/workers/" + id)
}

export const Logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', "Goodbye!");
        res.redirect('/');
    });
}

