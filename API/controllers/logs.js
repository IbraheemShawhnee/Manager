import { isAdminV } from "../middlewares/middleware.js";
import User from "../../models/user.js";
import Log from "../../models/log.js";


export const All = async (req, res, next) => {
	const page = parseInt(req.query.page) - 1 || 0;
	const limit = parseInt(req.query.limit) >= 0 ? parseInt(req.query.limit) : 30;
	let id = req.query.id || "";

	// missing a feature where we need to populate the worker and search by name
	// const search = req.query.search || "";

	// date format: YYYY-MM-DD
	const since = req.query.since || "2000-01-01";
	const till = req.query.till || "3000-01-01";
	const sinceDate = new Date(`${since}`).toLocaleDateString();
	const tillDate = new Date(`${till}`).toLocaleDateString();
	// if Not an Admin (or Super) then only return the logged in user logs
	if (!await isAdminV(req)) {
		id = req.user._id;
	}

	let logs;
	if (id === "") {
		logs = await Log
			.find({
				date: { $gte: sinceDate, $lte: tillDate }
			})
			.select("_id date isAbsence startingTime finishingTime OTV payment extraNotes worker")
			.sort({ date: -1 })
			.skip(page * limit)
			.limit(limit)
			.populate("worker", "name")
	}
	else {
		logs = await Log
			.find({
				worker: { $eq: id },
				date: { $gte: sinceDate, $lte: tillDate }
			})
			.select("_id date isAbsence startingTime finishingTime OTV payment extraNotes worker")
			.sort({ date: -1 })
			.skip(page * limit)
			.limit(limit)
			.populate("worker", "name")
	}

	return res
		.status(200)
		.json({
			page: page,
			limit: limit,
			logs: logs,
		})

}

export const Create = async (req, res, next) => {
	const { log } = req.body;
	const worker = await User.findById(log.worker);
	const newLog = new Log(log)
	await newLog.save();
	worker.logs.push(newLog._id)
	try {
		worker.save();
		return res
			.status(201)
			.json({
				message: "Log Added Successfully"
			});
	} catch (error) {
		return res
			.status(409)
			.json({
				message: error.message
			})
	}
}

export const View = async (req, res, next) => {
	const { logID } = req.params;
	const log = await Log
		.findById(logID)
		.select("_id date isAbsence startingTime finishingTime OTV payment extraNotes worker")
		.populate("worker", "name")
	if (!log) {
		return res.status(404).json({
			message: "Cannot find that log!"
		});
	}
	// if user isn't Admin (or Super) and is trying to access someone else's logs 
	if (!await isAdminV(req) && !log.worker.equals(req.user._id)) {
		return res
			.status(401)
			.json({
				message: "You do not have permission to access this!",
			});
	}

	return res
		.status(200)
		.json({
			log: log
		});
}


export const Update = async (req, res, next) => {
	const { logID } = req.params;
	const log = await Log.findByIdAndUpdate(logID, { ...req.body.log }, { new: true, runValidators: true })
	if (!log) {
		return res
			.status(404)
			.json({
				message: "Cannot find that log!"
			});
	}
	return res
		.status(201)
		.json({
			message: "Log Updated Successfully"
		});
}

export const Delete = async (req, res, next) => {
	const { logID } = req.params;
	const log = await Log.findByIdAndDelete(logID)
	if (!log) {
		return res
			.status(404)
			.json({
				message: "Cannot find that log!"
			});
	}
	return res
		.status(200)
		.json({
			message: "Log Deleted Successfully"
		});
}
