import Bill from "../models/bill.js";
import { billsPaginatedResult } from "../middlewares/middleware.js";
export const All = async (req, res) => {
	let page = parseInt(req.query.page);
	if (!page) {
		page = 1
	}
	const limit = 10;
	const startIndex = (page - 1) * limit;
	const endInex = page * limit;
	const pages = await billsPaginatedResult(page, startIndex, endInex)
	const bills = await Bill
		.find({})
		.skip(startIndex)
		.limit(limit)
		.sort({ date: -1 })
	let sum = await Bill.aggregate([{ $group: { _id: null, total: { $sum: "$value" } } }])
	if (sum.length < 1) {
		sum = [{ total: 0 }];
	}
	res.render("bills/index", {
		pageTitle: "Manager - Bills",
		bills: bills,
		sum: sum[0].total,
		pages: pages,
	})
}

export const RenderNewForm = (req, res) => {
	const date = new Date();
	const defaultDate = String(date.getFullYear()) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
	res.render("bills/new", {
		pageTitle: "Manager - Insert New Bill",
		date: defaultDate
	});
}

export const Create = async (req, res, next) => {
	if (req.body.bill.value < 0)
		req.body.bill.isExpenses = false;
	const bill = new Bill(req.body.bill)
	await bill.save();
	req.flash("success", "Bill Added Successfully");
	res.redirect("/bills")
}

export const View = async (req, res, next) => {
	const { id } = req.params
	const bill = await Bill.findById(id)
	if (!bill) {
		req.flash("error", "Cannot find that bill!");
		return res.redirect("/bills");
	}
	res.render("bills/show", {
		pageTitle: "Manager - Bill",
		bill: bill
	})
}

export const RenderEditForm = async (req, res, next) => {
	const id = req.params.id;
	const bill = await Bill.findById(id)
	if (!bill) {
		req.flash("error", "Cannot find that bill!");
		res.redirect("/bills");
	}
	res.render("bills/edit", {
		pageTitle: "Manager - Bill",
		bill: bill
	});
}

export const Update = async (req, res, next) => {
	const { id } = req.params;
	if (req.body.bill.value < 0)
		req.body.bill.isExpenses = false;
	const bill = await Bill.findByIdAndUpdate(id, { ...req.body.bill }, { new: true, runValidators: true })
	if (!bill) {
		req.flash("error", "Cannot find that bill!");
		return res.redirect("/bills");
	}
	req.flash("success", "Bill Updated Successfully");
	res.redirect("/bills/" + id)
}

export const Delete = async (req, res, next) => {
	const { id } = req.params;
	const bill = await Bill.findByIdAndDelete(id)
	if (!bill) {
		req.flash("error", "Cannot find that bill!");
		return res.redirect("/bills");
	}
	req.flash("success", "Bill Deleted Successfully");
	res.redirect("/bills")
}
