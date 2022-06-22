const Cheque = require("../models/cheque");
const Log = require("../models/log");
const User = require("../models/user");

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
	if (!user.isAdmin && !user.isSuper) {
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
	return user.isSuper;
}

module.exports.chequesPaginatedResult = async (page, startIndex, endInex) => {
	let pages = {}
	if (endInex < await Cheque.countDocuments().exec()) {
		pages.next = page + 1;
	}
	if (startIndex > 0) {
		pages.pervious = page - 1;
	}
	return pages;
}

module.exports.LogsPaginatedResult = async (page, startIndex, endInex) => {
	let pages = {}
	if (endInex < await Log.countDocuments().exec()) {
		pages.next = page + 1;
	}
	if (startIndex > 0) {
		pages.pervious = page - 1;
	}
	return pages;
}