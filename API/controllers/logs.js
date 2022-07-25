import { isAdminV } from "../middlewares/middleware.js";
import User from "../../models/user.js";
import Log from "../../models/log.js";


export const All = async (req, res, next) => {
	// let page = parseInt(req.query.page)
	// if (!page) {
	// 	page = 1
	// }
	// const date = new Date();
	// const limit = req.query.limit || date.getDate();
	// const startIndex = (page - 1) * limit;
	// const endInex = page * limit;
	// const pages = await logsPaginatedResult(page, startIndex, endInex)
	if (!await isAdminV(req)) {
		return res.redirect("/logs/myLogs")
	}
	const logs = await Log
		.find({})
		// .skip(startIndex)
		// .limit(limit)
		.sort({ date: -1 })
		.populate("worker")
	return res.status(200).json({
		logs: logs
	})
	// return res.render("logs/index", {
	// 	pageTitle: "Manager - Logs",
	// 	logs: logs,
	// 	pages: pages,
	// })

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
	return res.status(200).json({
		logs: logs
	});
}

export const Create = async (req, res, next) => {
	const { log } = req.body;
	const worker = await User.findById(log.worker);
	const newLog = new Log(log)
	await newLog.save();
	worker.logs.push(newLog._id)
	try {
		worker.save();
		return res.status(201).json({ message: "Log Added Successfully" });
	} catch (error) {
		return res.status(409).json({
			message: error.message
		})
	}
}

export const View = async (req, res, next) => {
	const { logID } = req.params;
	const log = await Log.findById(logID).populate("worker")
	if (!log) {
		return res.status(404).json({
			message: "Cannot find that log!"
		});
	}
	if (!await isAdminV(req) && !log.worker.equals(req.user._id)) {
		return res.status(401).json({
			message: "You do not have permission to access this!",
		});
	}
	return res.status(200).json({
		log: log
	});

}


export const Update = async (req, res, next) => {
	const { logID } = req.params;
	const log = await Log.findByIdAndUpdate(logID, { ...req.body.log }, { new: true, runValidators: true })
	if (!log) {
		return res.status(404).json({
			message: "Cannot find that log!"
		});
	}
	return res.status(201).json({
		message: "Log Updated Successfully",
	});
}

export const Delete = async (req, res, next) => {
	const { logID } = req.params;
	const log = await Log.findByIdAndDelete(logID)
	if (!log) {
		return res.status(404).json({
			message: "Cannot find that log!"
		});
	}
	return res.status(200).json({
		message: "Log Deleted Successfully",
	});
}
