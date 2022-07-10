const Bill = require("../../models/bill");
const Cheque = require("../../models/cheque");
const Log = require("../../models/log");
const User = require("../../models/user");

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.status(401).json({
			message: "You must be signed in first!"
		});
	}
	next();
}

module.exports.isAdmin = async (req, res, next) => {
	const user = await User.findById(req.user._id);
	if (!user.isAdmin && !user.isSuper) {
		return res.status(401).json({
			message: "You do not have permission to access this!"
		});
	}
	next();
}

module.exports.isAdminV = async (req) => {
	const user = await User.findById(req.user._id);
	return user.isAdmin || user.isSuper;
}

module.exports.isSuper = async (req, res, next) => {
	const user = await User.findById(req.user._id);
	if (!user.isSuper) {
		return res.status(401).json({
			message: "You do not have permission to access this!"
		});
	}
	next();
}

// module.exports.isSuperV = async (req) => {
// 	const user = await User.findById(req.user._id);
// 	return user.isSuper;
// }

// module.exports.chequesPaginatedResult = async (page, startIndex, endInex) => {
// 	let pages = {}
// 	if (endInex < await Cheque.countDocuments().exec()) {
// 		pages.next = page + 1;
// 	}
// 	if (startIndex > 0) {
// 		pages.pervious = page - 1;
// 	}
// 	return pages;
// }

// module.exports.logsPaginatedResult = async (page, startIndex, endInex) => {
// 	let pages = {}
// 	if (endInex < await Log.countDocuments().exec()) {
// 		pages.next = page + 1;
// 	}
// 	if (startIndex > 0) {
// 		pages.pervious = page - 1;
// 	}
// 	return pages;
// }

// module.exports.billsPaginatedResult = async (page, startIndex, endInex) => {
// 	let pages = {}
// 	if (endInex < await Bill.countDocuments().exec()) {
// 		pages.next = page + 1;
// 	}
// 	if (startIndex > 0) {
// 		pages.pervious = page - 1;
// 	}
// 	return pages;
// }