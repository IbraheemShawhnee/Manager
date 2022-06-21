const User = require("../models/user");

module.exports.renderRegisterForm = ((req, res) => {
    res.render("users/register", { pageTitle: "Manager - Register" })
})

module.exports.create = async (req, res, next) => {
    try {
        let { name, email, phoneNumber, username, password } = req.body;
        if (email && !email.length) {
            email = null;
        }
        const user = new User({ name, email, phoneNumber, username });
        const newUser = await User.register(user, password);
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

module.exports.renderLoginPage = (req, res) => {
    if (req.user && req.isAuthenticated()) {
        req.flash('success', "You are already logged in!");
        return res.redirect("/")
    }
    res.render("users/login", { pageTitle: "Manager - Login" })
}

module.exports.login = (req, res) => {
    req.flash("success", "Welcome Back!");
    const redirectUrl = req.session.returnTo || "/";
    delete req.session.returnTo
    res.redirect(redirectUrl);
}

module.exports.renderChangePassowrdForm = ((req, res) => {
    res.render("users/changePassword", { pageTitle: "Manager - Change Password" })
})

module.exports.passwordChange = async (req, res, next) => {
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/changePassword");
        } else {
            user.changePassword(req.body.oldpassword, req.body.password, function (err) {
                if (err) {
                    if (err.name === 'IncorrectPasswordError') {
                        req.flash("error", err.name);
                        return res.redirect("/changePassword");
                    } else {
                        req.flash("error", "Something went wrong!! Please try again after sometimes.");
                        return res.redirect("/changePassword");
                    }
                } else {
                    req.flash("success", "Password Changed Successfully")
                    return res.redirect("/changePassword");
                }
            })
        }

    });
}

module.exports.passwordSet = async (req, res, next) => {
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
    // User.findOne({ _id: id }, (err, user) => {
    //     if (err) {
    //         req.flash("error", err.message);
    //         return res.redirect("/workers");
    //     } else {
    //         user.setPassword(req.body.password, function (err) {
    //             if (err) {
    //                 req.flash("error", "Something went wrong!! Please try again after sometimes.");
    //                 return res.redirect("/workers");
    //             } else {
    //                 req.flash("success", "Password Changed Successfully")
    //                 return res.redirect("/workers");
    //             }
    //         })
    //     }
    // });
}

module.exports.logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', "Goodbye!");
        res.redirect('/');
    });
}

