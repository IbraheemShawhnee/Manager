const Payee = require("../models/payee");
const Cheque = require("../models/cheque");

module.exports.all = async (req, res, next) => {
	const cheques = await Cheque.find({ isCancelled: false }).sort({ date: -1 }).populate("payee")
	let sum = await Cheque.aggregate([{ $group: { _id: null, total: { $sum: "$value" } } }])
	if (sum.length < 1) {
		sum = [{ total: 0 }];
	}
	res.render("cheques/index", { cheques: cheques, sum: sum[0].total, pageTitle: "Manager - Cheques" })
}

module.exports.cancelled = async (req, res, next) => {
	const cheques = await Cheque.find({ isCancelled: true }).sort({ date: -1 })
	res.render("cheques/cancelled", { cheques: cheques, pageTitle: "Manager - Cheques" })
}

module.exports.deleted = async (req, res, next) => {
	const cheques = await Cheque.find({ isDeleted: true }).sort({ date: -1 })
	res.render("cheques/deleted", { cheques: cheques, pageTitle: "Manager - Cheques" })
}

module.exports.renderNewForm = async (req, res, next) => {
	const date = new Date();
	const payees = await Payee.find({})
	const defaultDate = String(date.getFullYear()) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + 30;
	res.render("cheques/new", { pageTitle: "Manager - Cheques", date: defaultDate, payees: payees })
}

module.exports.create = async (req, res, next) => {
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

module.exports.view = async (req, res, next) => {
	const { chequeID } = req.params;
	const cheque = await Cheque.findById(chequeID).populate("payee")
	if (!cheque) {
		req.flash("error", "Cannot find that cheque!");
		return res.redirect("/cheques");
	}
	res.render("cheques/show", { cheque: cheque, chequeID: chequeID, pageTitle: "Manager - Cheques" })
}

module.exports.renderEditForm = async (req, res, next) => {
	const { chequeID } = req.params;
	const cheque = await Cheque.findById(chequeID).populate("payee")
	const payees = await Payee.find({})
	if (!cheque) {
		req.flash("error", "Cannot find that cheque!");
		return res.redirect("/cheques");
	}
	res.render("cheques/edit", { chequeID: chequeID, cheque: cheque, payees: payees, pageTitle: "Manager - Cheques" });
}

module.exports.update = async (req, res, next) => {
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

module.exports.delete = async (req, res, next) => {
	const { chequeID } = req.params;
	const cheque = await Cheque.findByIdAndDelete(chequeID)
	if (!cheque) {
		req.flash("error", "Cannot find that cheque!");
		return res.redirect("/cheques");
	}
	req.flash("success", "Cheque Deleted Successfully");
	res.redirect("/cheques")
}