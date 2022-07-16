import Payee from "../../models/payee.js";
import Cheque from "../../models/cheque.js";
// const { chequesPaginatedResult } = require("../middlewares/middleware");


export const All = async (req, res, next) => {
	// const dates = {
	// 	null: false,
	// 	since: req.query.since,
	// 	till: req.query.till
	// };
	// if (!dates.since && !dates.till) {
	// 	dates.null = true;
	// 	dates.since = "1980-01-01"
	// 	dates.till = "3000-12-31"
	// }else if (!dates.till) {
	// 	dates.till = dates.since;
	// }
	// let page = parseInt(req.query.page);
	// if (!page) {
	// 	page = 1
	// }
	// const limit = 10;
	// const startIndex = (page - 1) * limit;
	// const endInex = page * limit;
	// const pages = await chequesPaginatedResult(page, startIndex, endInex)
	const cheques = await Cheque
		.find({
			isCancelled: false,
			// dueDate: {
			// 	$gte: dates.since,
			// 	$lte: dates.till,
			// }
		})
		// .skip(startIndex)
		// .limit(limit)
		.sort({ serial: -1 })
		.populate("payee")
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
	cheque.isCancelled = !!cheque.isCancelled;
	if (cheque.isCancelled || cheque.payee.length == 0) {
		cheque.isCancelled = true;
		delete cheque.payee;
	}
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
