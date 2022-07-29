import User from "../models/user.js";

export const All = async (req, res, next) => {
	const workers = await User.find({})
	res.render("workers/index", { workers: workers, pageTitle: "Manager - Worker" })
}

export const RenderNewForm = (req, res) => {
	res.redirect("/register")
}

export const View = async (req, res, next) => {
	const { id } = req.params;
	const worker = await User.findById(id).populate("logs")
	if (!worker) {
		req.flash("error", "Cannot find that worker!");
		return res.redirect("/workers");
	}
	res.render("workers/show", {
		pageTitle: "Manager - " + worker.name,
		worker: worker
	})
}

export const RenderEditForm = async (req, res, next) => {
	const { id } = req.params;
	const worker = await User.findById(id)
	if (!worker) {
		req.flash("error", "Cannot find that worker!");
		return res.redirect("/workers");
	}
	res.render("workers/edit", {
		pageTitle: "Manager - Edit " + worker.name,
		worker: worker
	});
}

export const Update = async (req, res, next) => {
	const { id } = req.params;
	const worker = await User.findByIdAndUpdate(id, { name: req.body.name, email: req.body.email, phoneNumber: req.body.phoneNumber }, { new: true, runValidators: true })
	if (!worker) {
		req.flash("error", "Cannot find that worker!");
		return res.redirect("/workers");
	}
	req.flash("success", "Worker Updated Successfully");
	res.redirect("/workers/" + id)
}

export const Delete = async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findByIdAndDelete(id)
	if (!user) {
		req.flash("error", "Cannot find that worker!");
		return res.redirect("/workers");
	}
	req.flash("success", "Worker Deleted Successfully");
	res.redirect("/workers")
}