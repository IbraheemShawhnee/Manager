const Bill = require("../../models/bill");
// const { billsPaginatedResult } = require("../middlewares/middleware");
module.exports.all = async (req, res) => {
	// let page = parseInt(req.query.page);
	// if (!page) {
	// 	page = 1
	// }
	// const limit = 10;
	// const startIndex = (page - 1) * limit;
	// const endInex = page * limit;
	// const pages = await billsPaginatedResult(page, startIndex, endInex)
	const bills = await Bill
		.find({})
		// .skip(startIndex)
		// .limit(limit)
		.sort({ date: -1 })
	let sum = await Bill.aggregate([{ $group: { _id: null, total: { $sum: "$value" } } }])
	if (sum.length < 1) {
		sum = [{ total: 0 }];
	}
	return res.status(200).json({
		bills: bills,
		sum: sum[0].total,
	});
	// res.render("bills/index", {
	// 	pageTitle: "Manager - Bills",
	// 	bills: bills,
	// 	sum: sum[0].total,
	// 	pages: pages,
	// })
}

module.exports.create = async (req, res, next) => {
	if (req.body.value < 0)
		req.body.isExpenses = false;
	const bill = new Bill(req.body)
	await bill.save()
	return res.status(201).json({
		message: "Bill Added Successfully",
	});
}

module.exports.view = async (req, res, next) => {
	const { id } = req.params
	const bill = await Bill.findById(id)
	if (!bill) {
		return res.status(404).json({
			message: "Cannot find that bill!"
		});
	}
	return res.status(200).json({
		bill: bill
	});
}


module.exports.update = async (req, res, next) => {
	const { id } = req.params;
	if (req.body.value < 0)
		req.body.isExpenses = false;
	const bill = await Bill.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true })
	if (!bill) {
		return res.status(404).json({
			message: "Cannot find that bill!"
		});
	}
	return res.status(201).json({
		message: "Bill updated successfully!",
		bill: bill
	});
}

module.exports.delete = async (req, res, next) => {
	const { id } = req.params;
	const bill = await Bill.findByIdAndDelete(id)
	if (!bill) {
		return res.status(404).json({
			message: "Cannot find that bill!"
		});
	}
	return res.status(201).json({
		message: "Bill Deleted Successfully",
	});
}


