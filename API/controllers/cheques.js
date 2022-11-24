import Payee from "../../models/payee.js";
import Cheque from "../../models/cheque.js";
// const { chequesPaginatedResult } = require("../middlewares/middleware");


export const All = async (req, res, next) => {
	// missing searchable names after populating
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
	// since date takes one day earlier?!
	const cheques = await Cheque
		.find({
			isCancelled: false,
			dueDate: { $gte: sinceDate, $lte: tillDate }
		})
		.skip(page * limit)
		.limit(limit)
		.sort({ dueDate: -1, serial: 1 })
		.populate("payee", "name")
	const _id = cheques.map(({ _id }) => _id)
	let sum = await Cheque.aggregate([
		{
			$match:
			{
				_id: { "$in": _id }
			}
		},
		{
			$group:
			{
				_id: null,
				total: { $sum: "$value" }
			}
		}
	])
	if (sum.length < 1) {
		sum = [{ total: 0 }];
	}
	res.status(200).json({
		cheques: cheques,
		sum: sum[0].total
	});
}

export const Cancelled = async (req, res, next) => {
	const cheques = await Cheque.find({ isCancelled: true }).sort({ serial: -1 })
	res.status(200).json({
		cheques: cheques
	});
}

export const Deleted = async (req, res, next) => {
	const cheques = await Cheque.find({ isDeleted: true }).sort({ serial: -1 })
	res.status(200).json({
		cheques: cheques,
	});
}

export const Create = async (req, res, next) => {
	const { cheque } = req.body;
	const payeeID = cheque.payee;
	const newCheque = new Cheque(cheque)
	try {
		await newCheque.save();
		if (!cheque.isCancelled) {
			const payee = await Payee.findById(payeeID);
			payee.cheques.push(newCheque._id)
			payee.save();
		}
		res.status(201).json({
			message: "Cheque Added Successfully"
		});
	}
	catch (error) {
		return res.status(409).json({
			message: error.message
		})
	}
}

export const View = async (req, res, next) => {
	const { chequeID } = req.params;
	const cheque = await Cheque.findById(chequeID).populate("payee")
	if (!cheque) {
		return res.status(404).json({
			message: "Cannot find that cheque!"
		});
	}
	return res.status(200).json({
		cheque: cheque
	});
}

export const Update = async (req, res, next) => {
	const { chequeID } = req.params;
	req.body.cheque.isCancelled = !!req.body.cheque.isCancelled;
	const cheque = await Cheque.findById(chequeID);
	if (!cheque) {
		return res.status(404).json({
			message: "Cannot find that cheque!"
		});
	}
	if (cheque.isCancelled && req.body.cheque.payee.length != 0) {
		req.body.cheque.isCancelled = false;
	} else if (cheque.isDeleted && req.body.cheque.payee.length != 0) {
		req.body.cheque.isDeleted = false;
	}
	if ((!cheque.isCancelled && req.body.cheque.isCancelled) || (cheque.isDeleted && req.body.cheque.payee.length == 0)) {
		delete req.body.cheque.payee;
	}
	if (cheque.isDeleted && req.body.cheque.isCancelled) {
		delete req.body.cheque.payee;
		req.body.cheque.isDeleted = false;
	}
	try {
		await Cheque.findByIdAndUpdate(chequeID, { ...req.body.cheque }, { new: true, runValidators: true })
		return res.status(201).json({
			message: "Cheque updated successfully!",
		});
	} catch (error) {
		return res.status(409).json({
			message: error.message
		})
	}
}

export const Delete = async (req, res, next) => {
	const { chequeID } = req.params;
	const cheque = await Cheque.findByIdAndDelete(chequeID)
	if (!cheque) {
		return res.status(404).json({
			message: "Cannot find that cheque!"
		});
	}
	return res.status(200).josn({
		message: "Cheque Deleted Successfully"
	})
}
