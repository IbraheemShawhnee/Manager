const { billSchema, logSchema, userSchema, payeeSchema, chequeSchema } = require("./schemas.js");
const ExpressError = require("./utils/ExpressError");
const User = require("./models/user");

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.returnTo = req.originalUrl
		req.flash("error", "You must be signed in first!");
		return res.redirect("/login");
	}
	next();
}

module.exports.isAdmin = async (req, res, next) => {
	const user = await User.findById(req.user._id);
	if (!user.isAdmin) {
		req.flash("error", "You do not have permission to access this!");
		return res.redirect("/");
	}
	next();
}

module.exports.isAdminV = async (req) => {
	const user = await User.findById(req.user._id);
	return user.isAdmin;
}

module.exports.isSuper = async (req, res, next) => {
	const user = await User.findById(req.user._id);
	if (!user.isSuper) {
		req.flash("error", "You do not have permission to access this!");
		return res.redirect("/");
	}
	next();
}

module.exports.isSuperV = async (req) => {
	const user = await User.findById(req.user._id);
	return user.isAdmin;
}

module.exports.validateBill = (req, res, next) => {
	const { error } = billSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new ExpressError(msg, 400)
	}
	else {
		next()
	}
}

module.exports.validateLog = (req, res, next) => {
	const { error } = logSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new ExpressError(msg, 400)
	}
	else {
		next()
	}
}

module.exports.validateUser = (req, res, next) => {
	const { error } = userSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new ExpressError(msg, 400)
	}
	else {
		next()
	}
}

module.exports.validatePayee = (req, res, next) => {
	const { error } = payeeSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new ExpressError(msg, 400)
	}
	else {
		next()
	}
}

module.exports.validateCheque = (req, res, next) => {
	const { error } = chequeSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new ExpressError(msg, 400)
	}
	else {
		next()
	}
}