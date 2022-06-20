const User = require("../models/user");

module.exports.all = async (req, res, next) => {
	const workers = await User.find({})
	res.render("workers/index", { workers: workers, pageTitle: "Manager - Worker" })
}

module.exports.renderNewForm = (req, res) => {
	res.redirect("/register")
}

module.exports.view = async (req, res, next) => {
	const { id } = req.params;
	const worker = await User.findById(id).populate("logs")
	if (!worker) {
		req.flash("error", "Cannot find that worker!");
		return res.redirect("/workers");
	}
	res.render("workers/show", { worker: worker, pageTitle: "Manager - " + worker.name })
}

module.exports.renderEditForm = async (req, res, next) => {
	const { id } = req.params;
	const worker = await User.findById(id)
	if (!worker) {
		req.flash("error", "Cannot find that worker!");
		return res.redirect("/workers");
	}
	res.render("workers/edit", { worker: worker, pageTitle: "Manager - " + worker.name });
}

module.exports.update = async (req, res, next) => {
	const { id } = req.params;
	const worker = await User.findByIdAndUpdate(id, { name: req.body.name, email: req.body.email, phoneNumber: req.body.phoneNumber }, { new: true, runValidators: true })
	if (!worker) {
		req.flash("error", "Cannot find that worker!");
		return res.redirect("/workers");
	}
	req.flash("success", "Worker Updated Successfully");
	res.redirect("/workers/" + id)
}

module.exports.delete = async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findByIdAndDelete(id)
	if (!user) {
		req.flash("error", "Cannot find that worker!");
		return res.redirect("/workers");
	}
	req.flash("success", "Worker Deleted Successfully");
	res.redirect("/workers")
}