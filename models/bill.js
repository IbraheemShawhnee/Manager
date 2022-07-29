import mongoose from "mongoose";
const { Schema } = mongoose;

const billSchema = new Schema({
	date: {
		type: Date,
		required: true
	},
	value: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	extraNotes: {
		type: String,
		required: false
	},
	isExpenses: {
		type: Boolean,
		default: true,
	}
})
const Bill = mongoose.model("Bill", billSchema);

export default Bill;