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


module.exports.passwordChange = async (req, res, next) => {
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            })
        } else {
            user.changePassword(req.body.oldPassword, req.body.password, function (err) {
                if (err) {
                    if (err.name === 'IncorrectPasswordError') {
                        return res.status(401).json({
                            message: "Incorrect Password"
                        })
                    } else {
                        console.log(err.name)
                        return res.status(500).json({
                            message: "Something went wrong!! Please try again after sometimes."
                        })
                    }
                } else {
                    return res.status(201).json({
                        message: "Password Changed Successfully"
                    })
                }
            })
        }

    });
}

module.exports.passwordSet = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        });
    }
    try {
        await user.setPassword(req.body.password);
        await user.save();
        return res.status(201).json({
            message: "Password Changed Successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

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


