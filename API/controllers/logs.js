const { isAdminV, logsPaginatedResult } = require('../middlewares/middleware');
const User = require("../../models/user");
const Log = require("../../models/log");


module.exports.all = async (req, res, next) => {
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

module.exports.mine = async (req, res, next) => {
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

module.exports.create = async (req, res, next) => {
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
	return res.status(201).json({ message: "Log Added Successfully" });
}

module.exports.view = async (req, res, next) => {
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


module.exports.update = async (req, res, next) => {
	const { logID } = req.params;
	if (req.body.log.payment.length == 0) {
		req.body.log.payment = 0;
	}
	req.body.log.isAbsence = !!req.body.log.isAbsence;
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

module.exports.delete = async (req, res, next) => {
	const { logID } = req.params;
	const log = await Log.findByIdAndDelete(logID)
	if (!log) {
		return res.status(404).json({
			message: "Cannot find that log!"
		});
	}
	return res.status(201).json({
		message: "Log Deleted Successfully",
	});
}