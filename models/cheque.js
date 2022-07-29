import mongoose from "mongoose";
const { Schema } = mongoose;

const chequeSchema = new Schema({
	serial: {
		type: Number,
		unique: true,
		required: [true, "Cheque Serial-Number is required!"]
	},
	dueDate: {
		type: Date,
		required: [true, "Cheque Due Date is required!"]
	},
	value: {
		type: Number,
		required: [true, "Cheque Value is required!"]
	},
	description: {
		type: String,
		required: false
	},
	payee: {
		type: Schema.Types.ObjectId,
		ref: "Payee",
		// required: [true, "Cheque must have a Payee!"],
	},
	isCancelled: {
		type: Boolean,
		default: false
	},
	isDeleted: {
		type: Boolean,
		default: false
	}

})



const Cheque = mongoose.model("Cheque", chequeSchema);

export default Cheque;