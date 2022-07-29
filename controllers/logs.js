import { isAdminV, logsPaginatedResult } from "../middlewares/middleware.js";
import User from "../models/user.js";
import Log from "../models/log.js";


export const All = async (req, res, next) => {
	let page = parseInt(req.query.page)
	if (!page) {
		page = 1
	}
	const date = new Date();
	const limit = req.query.limit || date.getDate();
	const startIndex = (page - 1) * limit;
	const endInex = page * limit;
	const pages = await logsPaginatedResult(page, startIndex, endInex)
	if (!await isAdminV(req)) {
		return res.redirect("/logs/myLogs")
	}
	const logs = await Log
		.find({})
		.skip(startIndex)
		.limit(limit)
		.sort({ date: -1 })
		.populate("worker")
	return res.render("logs/index", {
		pageTitle: "Manager - Logs",
		logs: logs,
		pages: pages,
	})

}

export const Mine = async (req, res, next) => {
	// let page = parseInt(req.query.page)
	// if (!page) {
	// 	page = 1
	// }
	// const date = new Date();
	// const limit = req.query.limit || date.getDate();
	// const startIndex = (page - 1) * limit;
	// const endInex = page * limit;
	// const pages = logsPaginatedResult(page, startIndex, endInex)
	const { user } = req;
	await user.populate("logs")
	// .skip(startIndex)
	// .limit(limit)
	const logs = user.logs
	return res.render("logs/index", {
		pageTitle: "Manager - My Logs",
		logs: logs,
		// pages: pages,
	})
}

export const RenderNewForn = async (req, res, next) => {
	const date = new Date();
	const workers = await User.find({})
	const defaultDate = String(date.getFullYear()) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
	res.render("logs/new", {
		pageTitle: "Manager - Insert New Log",
		date: defaultDate,
		workers: workers
	})
}

export const Create = async (req, res, next) => {
	const { log } = req.body;
	if (log.payment.length == 0) {
		log.payment = 0;
	}
	log.isAbsence = !!log.isAbsence;
	const workerID = log.worker;
	const worker = await User.findById(workerID);
	const newLog = new Log(log)
	await newLog.save();
	worker.logs.push(newLog._id)
	worker.save();
	req.flash("success", "Log Added Successfully");
	res.redirect("/logs")
}

export const View = async (req, res, next) => {
	const { logID } = req.params;
	const log = await Log.findById(logID).populate("worker")
	if (!log) {
		req.flash("error", "Cannot find that log!");
		return res.redirect("/logs");
	}
	if (!await isAdminV(req) && !log.worker.equals(req.user._id)) {
		req.flash("error", "You do not have permission to access this!");
		return res.redirect("/logs/myLogs");
	}
	return res.render("logs/show", {
		pageTitle: "Manager - Log",
		log: log,
	})

}

export const RenderEditForm = async (req, res, next) => {
	const { logID } = req.params;
	const log = await Log.findById(logID).populate("worker")
	const workers = await User.find({})
	if (!log) {
		req.flash("error", "Cannot find that log!");
		return res.redirect("/logs");
	}
	res.render("logs/edit", {
		pageTitle: "Manager - Log",
		log: log,
		workers: workers
	});
}

export const Update = async (req, res, next) => {
	const { logID } = req.params;
	if (req.body.log.payment.length == 0) {
		req.body.log.payment = 0;
	}
	req.body.log.isAbsence = !!req.body.log.isAbsence;
	const log = await Log.findByIdAndUpdate(logID, { ...req.body.log }, { new: true, runValidators: true })
	if (!log) {
		req.flash("error", "Cannot find that log!");
		return res.redirect("/logs");
	}
	req.flash("success", "Log Updated Successfully");
	res.redirect("/logs/" + logID)
}

export const Delete = async (req, res, next) => {
	const { logID } = req.params;
	const log = await Log.findByIdAndDelete(logID)
	if (!log) {
		req.flash("error", "Cannot find that log!");
		return res.redirect("/logs");
	}
	req.flash("success", "Log Deleted Successfully");
	res.redirect("/logs")
}