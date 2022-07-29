const Cheque = require("../../models/cheque");
const Payee = require("../../models/payee");

module.exports.all = async (req, res, next) => {
	const payees = await Payee.find({})
	return res.status(200).json({
		payees: payees
	});
}

module.exports.create = async (req, res, next) => {
	const payee = new Payee(req.body)
	await payee.save();
	return res.status(201).json({ message: "Payee Added Successfully" });
}

module.exports.view = async (req, res, next) => {
	const { payeeID } = req.params;
	const payee = await Payee.findById(payeeID)
	// .populate("cheques")
	const cheques = await Cheque.find({
		payee: payeeID
	})
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
	if (!payee) {
		return res.status(404).json({
			message: "Cannot find that payee!"
		});
	}
	if (!sum[0]) {
		total = 0;
	}
	else {
		total = sum[0].total;
	}
	return res.status(200).json({
		payee: payee,
		cheques: cheques,
		sum: total
	});
}

module.exports.update = async (req, res, next) => {
	const { payeeID } = req.params;
	const payee = await Payee.findByIdAndUpdate(payeeID, { ...req.body.payee }, { new: true, runValidators: true })
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

module.exports.delete = async (req, res, next) => {
	const { payeeID } = req.params;
	const payee = await Payee.findByIdAndDelete(payeeID)
	if (!payee) {
		return res.status(404).json({
			message: "Cannot find that payee!"
		});
	}
	return res.status(201).json({
		message: "Payee Deleted Successfully",
	});
}
