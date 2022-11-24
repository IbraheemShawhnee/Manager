import Cheque from "../../models/cheque.js";
import Payee from "../../models/payee.js";


export const All = async (req, res, next) => {
	const search = req.query.search || "";
	const payees = await Payee
		.find({
			name: { $regex: search, $options: "i" }
		})
	return res.status(200).json({
		payees: payees
	});
}

export const Create = async (req, res, next) => {
	const payee = new Payee(req.body)
	try {
		await payee.save();
		return res.status(201).json({
			payee,
			message: "Payee Added Successfully"
		});
	} catch (error) {
		return res.status(409).json({
			message: error.message
		})
	}
}

export const View = async (req, res, next) => {
	// When viewing a payee we need date search after populating!
	const { payeeID } = req.params;
	const payee = await Payee.findById(payeeID)
	const cheques = await Cheque.find({
		payee: payeeID,

	})
	const _id = cheques.map(({ _id }) => _id)
	//	find the total sum of cheques'a values for that payee
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
	if (!payee) {
		return res.status(404).json({
			message: "Cannot find that payee!"
		});
	}
	let total = 0;
	if (sum[0]) {
		total = sum[0].total;
	}
	return res.status(200).json({
		payee: payee,
		cheques: cheques,
		sum: total
	});
}

export const Update = async (req, res, next) => {
	const { payeeID } = req.params;
	const payee = await Payee.findByIdAndUpdate(payeeID, { ...req.body }, { new: true, runValidators: true })
	if (!payee) {
		return res.status(404).json({
			message: "Cannot find that payee!"
		});
	}
	return res.status(201).json({
		message: "Payee Updated Successfully",
		payee: payee
	});
}

export const Delete = async (req, res, next) => {
	const { payeeID } = req.params;
	const payee = await Payee.findByIdAndDelete(payeeID)
	if (!payee) {
		return res.status(404).json({
			message: "Cannot find that payee!"
		});
	}
	return res.status(200).json({
		message: "Payee Deleted Successfully",
	});
}