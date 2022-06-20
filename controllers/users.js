const User = require("../models/user");

module.exports.renderRegisterForm = ((req, res) => {
    res.render("users/register", { pageTitle: "Manager - Register" })
})

module.exports.create = async (req, res, next) => {
    try {
        let { name, email, phoneNumber, username, password } = req.body;
        if (!email.length) {
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

module.exports.logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', "Goodbye!");
        res.redirect('/');
    });
}

