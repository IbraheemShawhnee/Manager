const mongoose = require("mongoose");
const { Schema } = mongoose;

const logSchema = new Schema({
	date: {
		type: Date,
		required: [true, "Log must have a date!"]
	},
	isAbsence: {
		type: Boolean,
		default: false
	},
	time: {
		type: String,
		required: false
	},
	overtime: {
		type: String,
		required: false
	},
	overtimeValue: {
		type: String,
		required: false
	},
	payment: {
		type: Number,
		default: 0,
		required: false
	},
	extraNotes: {
		type: String,
		required: false
	},
	worker: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Log must have a worker!"],
	}
})
const Log = mongoose.model("Log", logSchema);

module.exports = Log;