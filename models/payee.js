const mongoose = require("mongoose");
const Cheque = require("./cheque");
const { Schema } = mongoose;

const payeeSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: false
	},
	phoneNumber: {
		type: String,
		required: false
	},
	extraNotes: {
		type: String,
		required: false
	},
	cheques: [
		{
			type: Schema.Types.ObjectId,
			ref: "Cheque"
		}
	]
})

payeeSchema.post("findOneAndDelete", async function (payee) {
	if (payee.cheques.length) {
		await Cheque.updateMany({ _id: { $in: payee.cheques } }, { isDeleted: true, payee: null })
	}
})

const Payee = mongoose.model("Payee", payeeSchema);

module.exports = Payee;