const User = require("../../models/user");
const Log = require("../../models/log");

module.exports.all = async (req, res, next) => {
	const workers = await User.find({})
	return res.status(200).json({
		workers: workers,
	});
}


module.exports.view = async (req, res, next) => {
	const { id } = req.params;
	const worker = await User.findById(id)
	if (!worker) {
		return res.status(404).json({
			message: "Cannot find that worker!"
		});
	}
	const logs = await Log.find({
		worker: id
	})
	const _id = logs.map(({ _id }) => _id)
	//	Count the number of non-absence days in a given period of time
	// let counter = await Cheque.aggregate([
	// 	{
	// 		$match:
	// 		{
	// 			_id: { "$in": _id }
	// 		}
	// 	},
	// 	{
	// 		$group:
	// 		{
	// 			_id: null,
	// 			total: { $sum: "$value" }
	// 		}
	// 	}
	// ])
	return res.status(200).json({
		worker: worker,
		logs: logs
	});
}

module.exports.update = async (req, res, next) => {
	const { id } = req.params;
	const worker = await User.findByIdAndUpdate(id, { name: req.body.name, email: req.body.email, phoneNumber: req.body.phoneNumber }, { new: true, runValidators: true })
	if (!worker) {
		return res.status(404).json({
			message: "Cannot find that worker!"
		});
	}
	return res.status(201).json({
		message: "Worker Updated Successfully",
		worker: worker
	});
}

module.exports.delete = async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findByIdAndDelete(id)
	if (!user) {
		return res.status(404).json({
			message: "Cannot find that worker!"
		});
	}
	return res.status(201).json({
		message: "Worker Deleted Successfully",
	});
}