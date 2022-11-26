import Payee from "../../models/payee.js";
import Cheque from "../../models/cheque.js";

export const All = async (req, res, next) => {
	const page = parseInt(req.query.page) - 1 || 0;
	const limit = parseInt(req.query.limit) >= 0 ? parseInt(req.query.limit) : 30;
	const search = req.query.search || "";
	// date format: YYYY/MM/DD
	const since = req.query.since || "2000-01-01";
	const till = req.query.till || "3000-01-01";
	const sinceDate = new Date(`${since}`);
	const tillDate = new Date(`${till}`);

	const cheques = await Cheque
		.aggregate([
			{
				$lookup: { // similar to .populate() in mongoose
					from: "payees", // the other collection name
					localField: "payee", // the field referencing the other collection in the current collection
					foreignField: "_id", // the name of the column where the cell in the current collection can be found in the other collection
					as: "payee" // the field you want to place the db response in. this will overwrite payee id with the actual document in the response (it only writes to the response, not on the database, no worries)
				}
			},
			{ // this is where you'll place your filter object you used to place inside .find()
				$match: {
					"isCancelled": false,
					"dueDate": { $gte: sinceDate, $lte: tillDate },
					"payee.name" :  { $regex: search, $options: "i" } , // this is how you access the actual object from the other collection after population, using the dot notation but inside a string.
				}
			},
			{ // this is similar to .select()
				$project: { _id: 1, serial: 1, dueDate: 1, value: 1, "payee.name": 1, "payee._id": 1 }
			},
			{
				$unwind: '$payee' // this picks the only object in the field payee: [ { payeeDoc } ] --> { payeeDoc }
			}
		])
		.skip(page * limit)
		.limit(limit)
		.sort({ dueDate: -1, serial: 1 })

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

	return res
		.status(200)
		.json({
			page: page,
			limit: limit,
			cheques: cheques,
			sum: sum[0].total
		});
}

export const Cancelled = async (req, res, next) => {
	const cheques = await Cheque
		.find({ isCancelled: true })
		.select("_id serial dueDate value isCancelled isDeleted")
		.sort({ serial: -1 })
	return res
		.status(200)
		.json({
			cheques: cheques
		});
}

export const Deleted = async (req, res, next) => {
	const cheques = await Cheque
		.find({ isDeleted: true })
		.select("_id serial dueDate value isCancelled isDeleted")
		.sort({ serial: -1 })
	return res
		.status(200)
		.json({
			cheques: cheques
		});
}

export const Create = async (req, res, next) => {
	// Cheque is expected to be received as an Object called cheque
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
		return res
			.status(201)
			.json({
				message: "Cheque Added Successfully"
			});
	}
	catch (error) {
		return res
			.status(409)
			.json({
				message: error.message
			})
	}
}

export const View = async (req, res, next) => {
	const { chequeID } = req.params;
	const cheque = await Cheque
		.findById(chequeID)
		.select("_id serial dueDate value isCancelled payee isDeleted")
		.populate("payee", "name")
	if (!cheque) {
		return res
			.status(404)
			.json({
				message: "Cannot find that cheque!"
			});
	}
	return res
		.status(200)
		.json({
			cheque: cheque
		});
}

export const Update = async (req, res, next) => {
	// Cheque is expected to be received as an Object called cheque
	const { chequeID } = req.params;
	req.body.cheque.isCancelled = !!req.body.cheque.isCancelled;
	const cheque = await Cheque.findById(chequeID);
	if (!cheque) {
		return res
			.status(404)
			.json({
				message: "Cannot find that cheque!"
			});
	}
	// Cheque Cancelled and req has payee  
	if (cheque.isCancelled && req.body.cheque.payee.length != 0) {
		req.body.cheque.isCancelled = false;
	}
	// Cheque Cancelled and req has payee  
	else if (cheque.isDeleted && req.body.cheque.payee.length != 0) {
		req.body.cheque.isDeleted = false;
	}
	// Cheque is Cancelled and req has Cancelation OR  ... IDR :'(
	if ((!cheque.isCancelled && req.body.cheque.isCancelled) || (cheque.isDeleted && req.body.cheque.payee.length == 0)) {
		delete req.body.cheque.payee;
	}
	// Cheque Deleted and req has Cancelation  
	if (cheque.isDeleted && req.body.cheque.isCancelled) {
		delete req.body.cheque.payee;
		req.body.cheque.isDeleted = false;
	}
	try {
		await Cheque
			.findByIdAndUpdate(chequeID, { ...req.body.cheque }, { new: true, runValidators: true })
		return res
			.status(201)
			.json({
				message: "Cheque updated successfully!"
			});
	} catch (error) {
		return res
			.status(409)
			.json({
				message: error.message
			})
	}
}

export const Delete = async (req, res, next) => {
	const { chequeID } = req.params;
	const cheque = await Cheque.findByIdAndDelete(chequeID)
	if (!cheque) {
		return res
			.status(404)
			.json({
				message: "Cannot find that cheque!"
			});
	}
	return res
		.status(200)
		.json({
			message: "Cheque Deleted Successfully"
		})
}
