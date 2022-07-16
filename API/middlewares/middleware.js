import User from "../../models/user.js";
// import Bill from "../../models/bill.js";
// import Cheque from "../../models/cheque.js";
// import Log from "../../models/log.js";

export const isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return res.status(401).json({
			message: "You must be signed in first!"
		});
	}
	next();
}

export const isAdmin = async (req, res, next) => {
	const user = await User.findById(req.user._id);
	if (!user.isAdmin && !user.isSuper) {
		return res.status(401).json({
			message: "You do not have permission to access this!"
		});
	}
	next();
}

export const isAdminV = async (req) => {
	const user = await User.findById(req.user._id);
	return user.isAdmin || user.isSuper;
}

export const isSuper = async (req, res, next) => {
	const user = await User.findById(req.user._id);
	if (!user.isSuper) {
		return res.status(401).json({
			message: "You do not have permission to access this!"
		});
	}
	next();
}

// export const isSuperV = async (req) => {
// 	const user = await User.findById(req.user._id);
// 	return user.isSuper;
// }

// export const chequesPaginatedResult = async (page, startIndex, endInex) => {
// 	let pages = {}
// 	if (endInex < await Cheque.countDocuments().exec()) {
// 		pages.next = page + 1;
// 	}
// 	if (startIndex > 0) {
// 		pages.pervious = page - 1;
// 	}
// 	return pages;
// }

// export const logsPaginatedResult = async (page, startIndex, endInex) => {
// 	let pages = {}
// 	if (endInex < await Log.countDocuments().exec()) {
// 		pages.next = page + 1;
// 	}
// 	if (startIndex > 0) {
// 		pages.pervious = page - 1;
// 	}
// 	return pages;
// }

// export const billsPaginatedResult = async (page, startIndex, endInex) => {
// 	let pages = {}
// 	if (endInex < await Bill.countDocuments().exec()) {
// 		pages.next = page + 1;
// 	}
// 	if (startIndex > 0) {
// 		pages.pervious = page - 1;
// 	}
// 	return pages;
// }