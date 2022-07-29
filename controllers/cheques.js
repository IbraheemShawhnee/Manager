import Payee from "../models/payee.js";
import Cheque from "../models/cheque.js";
import { chequesPaginatedResult } from "../middlewares/middleware.js";

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
	let page = parseInt(req.query.page);
	if (!page) {
		page = 1
	}
	const limit = 10;
	const startIndex = (page - 1) * limit;
	const endInex = page * limit;
	const pages = await chequesPaginatedResult(page, startIndex, endInex)
	const cheques = await Cheque
		.find({
			isCancelled: false,
			// dueDate: {
			// 	$gte: dates.since,
			// 	$lte: dates.till,
			// }
		})
		.skip(startIndex)
		.limit(limit)
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
	res.render("cheques/index", {
		pageTitle: "Manager - Cheques",
		cheques: cheques,
		sum: sum[0].total,
		pages: pages,
		// dates: dates,
	})
}

export const Cancelled = async (req, res, next) => {
	const cheques = await Cheque.find({ isCancelled: true }).sort({ serial: -1 })
	res.render("cheques/cancelled", {
		pageTitle: "Manager - Cancelled Cheques",
		cheques: cheques,
	})
}

export const Deleted = async (req, res, next) => {
	const cheques = await Cheque.find({ isDeleted: true }).sort({ serial: -1 })
	res.render("cheques/deleted", {
		pageTitle: "Manager - Cheques",
		cheques: cheques
	})
}

export const RenderNewForm = async (req, res, next) => {
	const date = new Date();
	const payees = await Payee.find({})
	const defaultDate = String(date.getFullYear()) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + 30;
	res.render("cheques/new", {
		pageTitle: "Manager - Insert New Cheque",
		date: defaultDate,
		payees: payees
	})
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
	await newCheque.save();
	if (!cheque.isCancelled) {
		const payee = await Payee.findById(payeeID);
		payee.cheques.push(newCheque._id)
		payee.save();
	}
	req.flash("success", "Cheque Added Successfully");
	res.redirect("/cheques/" + newCheque._id)
}

export const View = async (req, res, next) => {
	const { chequeID } = req.params;
	const cheque = await Cheque.findById(chequeID).populate("payee")
	if (!cheque) {
		req.flash("error", "Cannot find that cheque!");
		return res.redirect("/cheques");
	}
	res.render("cheques/show", {
		pageTitle: `Manager - Cheques #${cheque.serial}`,
		cheque: cheque
	})
}

export const RenderEditForm = async (req, res, next) => {
	const { chequeID } = req.params;
	const cheque = await Cheque.findById(chequeID).populate("payee")
	const payees = await Payee.find({})
	if (!cheque) {
		req.flash("error", "Cannot find that cheque!");
		return res.redirect("/cheques");
	}
	res.render("cheques/edit", {
		pageTitle: `Manager - Cheques #${cheque.serial}`,
		cheque: cheque,
		payees: payees,
	});
}

export const Update = async (req, res, next) => {
	const { chequeID } = req.params;
	req.body.cheque.isCancelled = !!req.body.cheque.isCancelled;
	const cheque = await Cheque.findById(chequeID);
	if (!cheque) {
		req.flash("error", "Cannot find that cheque!");
		return res.redirect("/cheques");
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
	await Cheque.findByIdAndUpdate(chequeID, { ...req.body.cheque }, { new: true, runValidators: true })
	req.flash("success", "Cheque Updated Successfully");
	res.redirect("/cheques/" + chequeID)
}

export const Delete = async (req, res, next) => {
	const { chequeID } = req.params;
	const cheque = await Cheque.findByIdAndDelete(chequeID)
	if (!cheque) {
		req.flash("error", "Cannot find that cheque!");
		return res.redirect("/cheques");
	}
	req.flash("success", "Cheque Deleted Successfully");
	res.redirect("/cheques")
}