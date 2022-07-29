import Payee from "../models/payee.js";

export const All = async (req, res, next) => {
	const payees = await Payee.find({})
	res.render("payees/index", {
		pageTitle: "Manager - Payees",
		payees: payees
	})
}

export const RenderNewForm = (req, res) => {
	res.render("payees/new", {
		pageTitle: "Manager - Insert New Payee"
	})
}

export const Create = async (req, res, next) => {
	const payee = new Payee(req.body.payee)
	await payee.save();
	req.flash("success", "Payee Added Successfully");
	res.redirect("/payees")
}

export const View = async (req, res, next) => {
	const { payeeID } = req.params;
	const payee = await Payee.findById(payeeID).populate("cheques")
	if (!payee) {
		req.flash("error", "Cannot find that payee!");
		return res.redirect("/payees");
	}
	res.render("payees/show", {
		pageTitle: "Manager - Payee",
		payee: payee
	})
}

export const RenderEditForm = async (req, res, next) => {
	const { payeeID } = req.params;
	const payee = await Payee.findById(payeeID)
	if (!payee) {
		req.flash("error", "Cannot find that payee!");
		return res.redirect("/payees");
	}
	res.render("payees/edit", {
		pageTitle: "Manager - Payee",
		payee: payee
	});
}

export const Update = async (req, res, next) => {
	const { payeeID } = req.params;
	const payee = await Payee.findByIdAndUpdate(payeeID, { ...req.body.payee }, { new: true, runValidators: true })
	if (!payee) {
		req.flash("error", "Cannot find that payee!");
		return res.redirect("/payees");
	}
	req.flash("success", "Payee Updated Successfully");
	res.redirect("/payees/" + payeeID)
}

export const Delete = async (req, res, next) => {
	const { payeeID } = req.params;
	const payee = await Payee.findByIdAndDelete(payeeID)
	if (!payee) {
		req.flash("error", "Cannot find that payee!");
		return res.redirect("/payees");
	}
	req.flash("success", "Payee Deleted Successfully");
	res.redirect("/payees")
}
