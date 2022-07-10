if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const PORT = process.env.PORT || 80
const CLIENT = `http://localhost:${PORT}/`
const User = require("../../models/user");

module.exports.create = async (req, res, next) => {
    try {
        let { name, email, phoneNumber, username, password } = req.body;
        const user = new User({ name, email, phoneNumber, username });
        await User.register(user, password);
        res.status(201).json({ message: "Worker created successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports.checkUsername = async (req, res, next) => {
    const { username } = req.body;
    const user = await User.findByUsername(username);
    if (!user) {
        return res.status(200).json({ available: true });
    }
    return res.status(200).json({ available: false });
}

module.exports.successLogin = (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Logged in Successfully",
        cookies: req.cookies,
        user: req.user
    });
}


module.exports.failedLogin = (req, res) => {
    return res.status(401).json({
        success: false,
        message: "Invalid login credentials"
    });
}

module.exports.logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return res.redirect(`${CLIENT}500`)
        }
        return res.redirect(CLIENT);
    });
}

// module.exports.renderChangePassowrdForm = ((req, res) => {
//     res.render("users/changePassword", {
//         pageTitle: "Manager - Change Password"
//     })
// })

// module.exports.passwordChange = async (req, res, next) => {
//     User.findOne({ _id: req.user._id }, (err, user) => {
//         if (err) {
//             req.flash("error", err.message);
//             return res.redirect("/changePassword");
//         } else {
//             user.changePassword(req.body.oldpassword, req.body.password, function (err) {
//                 if (err) {
//                     if (err.name === 'IncorrectPasswordError') {
//                         req.flash("error", "Incorrect Password");
//                         return res.redirect("/changePassword");
//                     } else {
//                         req.flash("error", "Something went wrong!! Please try again after sometimes.");
//                         return res.redirect("/changePassword");
//                     }
//                 } else {
//                     req.flash("success", "Password Changed Successfully")
//                     return res.redirect("/");
//                 }
//             })
//         }

//     });
// }

// module.exports.passwordSet = async (req, res, next) => {
//     const { id } = req.params;
//     const user = await User.findOne({ _id: id });
//     if (!user) {
//         req.flash("error", "User Not Found");
//         return res.redirect("/workers");
//     }
//     try {
//         await user.setPassword(req.body.password);
//         await user.save();
//         req.flash("success", "Password Changed Successfully")
//         return res.redirect("/workers");
//     } catch (err) {
//         req.flash("error", err.message);
//         return res.redirect("/workers");
//     }
// }

// module.exports.updatePermissions = async (req, res, next) => {
//     const { id } = req.params;
//     let { permissions } = req.body;
//     if (!permissions) {
//         permissions = {
//             isAdmin: false,
//             isSuper: false
//         }
//     } else {
//         permissions.isAdmin = !!permissions.isAdmin;
//         permissions.isSuper = !!permissions.isSuper;
//     }
//     const worker = await User.findByIdAndUpdate(id, { isAdmin: permissions.isAdmin, isSuper: permissions.isSuper }, { new: true, runValidators: true })
//     if (!worker) {
//         req.flash("error", "Cannot find that worker!");
//         return res.redirect("/workers");
//     }
//     req.flash("success", "Permissions Updated Successfully");
//     res.redirect("/workers/" + id)
// }

// module.exports.logout = async (req, res, next) => {
//     req.logout((err) => {
//         if (err) {
//             return next(err);
//         }
//         req.flash('success', "Goodbye!");
//         res.redirect('/');
//     });
// }

