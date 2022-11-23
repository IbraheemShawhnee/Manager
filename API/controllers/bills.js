import Bill from "../../models/bill.js";
// const { billsPaginatedResult } = require("../middlewares/middleware");

export const All = async (req, res) => {
	const page = parseInt(req.query.page) - 1 || 0;
	const limit = parseInt(req.query.limit) <= 0 ? parseInt(req.query.limit) : 40;
	// date format: YYYY-MM-DD
	const since = req.query.since || "2000-01-01";
	const till = req.query.till || "3000-01-01";
	const sinceDate = new Date(`<${since}>`);
	const tillDate = new Date(`<${till}>`);
	const bills = await Bill
		.find({
			date: { $gte: sinceDate, $lte: tillDate }
		})
		.sort({ date: -1 })
		.skip(page * limit)
		.limit(limit)
	let sum = await Bill.aggregate([
		{
			$match: {
				$and: [
					{ date: { $gte: sinceDate } },
					{ date: { $lte: tillDate } }
				]
			}
		},
		{
			$group: {
				_id: null, total: { $sum: "$value" }
			}
		}
	])
	if (sum.length < 1) {
		sum = [{ total: 0 }];
	}
	return res.status(200).json({
		page: page,
		limit: limit,
		bills: bills,
		sum: sum[0].total,
	});
}

export const Create = async (req, res, next) => {
	if (req.body.value < 0)
		req.body.isExpenses = false;
	const bill = new Bill(req.body)
	try {
		await bill.save();
		return res.status(201).json({
			message: "Bill Added Successfully",
			bill: bill
		});
	} catch (error) {
		return res.status(409).json({
			message: error.message
		})
	}
}

export const View = async (req, res, next) => {
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


export const Update = async (req, res, next) => {
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
	});
}

export const Delete = async (req, res, next) => {
	const { id } = req.params;
	const bill = await Bill.findByIdAndDelete(id)
	if (!bill) {
		return res.status(404).json({
			message: "Cannot find that bill!"
		});
	}
	return res.status(200).json({
		message: "Bill Deleted Successfully",
	});
}


