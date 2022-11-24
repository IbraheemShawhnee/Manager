import User from "../../models/user.js";

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