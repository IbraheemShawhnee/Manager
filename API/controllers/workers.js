import User from "../../models/user.js";
import Log from "../../models/log.js";


export const All = async (req, res, next) => {
	const search = req.query.search || "";
	const workers = await User
		.find({
			name: { $regex: search, $options: "i" }
		})
		.select('_id username name email phoneNumber')
	return res
		.status(200)
		.json({
			workers: workers,
		});
}


export const View = async (req, res, next) => {
	const { id } = req.params;
	// date format: YYYY-MM-DD
	const since = req.query.since || "2000-01-01";
	const till = req.query.till || "3000-01-01";
	const sinceDate = new Date(`${since}`).toLocaleDateString();
	const tillDate = new Date(`${till}`).toLocaleDateString();

	const worker = await User
		.findById(id)
		.select("_id name email phoneNumber isAdmin isSuper")
	if (!worker) {
		return res.status(404).json({
			message: "Cannot find that worker!"
		});
	}

	const logs = await Log
		.find({
			worker: id,
			date: { $gte: sinceDate, $lte: tillDate }
		})
		.select("_id date isAbsence startingTime finishingTime OTV payment extraNotes")

	// const _id = logs.map(({ _id }) => _id)
	//	Count the number of non-absence days in a given period of time
	// let count = await Log.aggregate([
	// 	{
	// 		$match:
	// 		{
	// 			_id: { "$in": _id }
	// 		}
	// 	},
	// 	{
	// 		$group:
	// 		{
	// 			_id: "$isAbsence",
	// 			count: { $sum: 1 }
	// 		}
	// 	}
	// ])
	// if (count.length < 1) {
	// 	count = [{ count: 0 }];
	// }

	return res
		.status(200)
		.json({
			worker: worker,
			logs: logs,
			// count: count[0].count
		});
}

export const Update = async (req, res, next) => {
	const { id } = req.params;
	const worker = await User.findByIdAndUpdate(id, { name: req.body.name, email: req.body.email, phoneNumber: req.body.phoneNumber }, { new: true, runValidators: true })
	if (!worker) {
		return res
			.status(404)
			.json({
				message: "Cannot find that worker!"
			});
	}
	return res
		.status(201)
		.json({
			message: "Worker Updated Successfully",
		});
}

export const Delete = async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findByIdAndDelete(id)
	if (!user) {
		return res
			.status(404)
			.json({
				message: "Cannot find that worker!"
			});
	}
	return res
		.status(200)
		.json({
			message: "Worker Deleted Successfully",
		});
}
