const { billSchema, logSchema, userSchema, payeeSchema, chequeSchema } = require("../schemas.js");

module.exports.validateBill = (req, res, next) => {
	const { error } = billSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		console.log(msg);
		return res.status(400).json({
			message: msg
		})
	}
	else {
		next()
	}
}

module.exports.validateLog = (req, res, next) => {
	const { error } = logSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		return res.status(400).json({
			message: msg
		})
	}
	else {
		next()
	}
}

module.exports.validateUser = (req, res, next) => {
	const { error } = userSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		return res.status(400).json({
			message: msg
		})
	}
	else {
		next()
	}
}

module.exports.validatePayee = (req, res, next) => {
	const { error } = payeeSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		return res.status(400).json({
			message: msg
		})
	}
	else {
		next()
	}
}

module.exports.validateCheque = (req, res, next) => {
	const { error } = chequeSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		return res.status(400).json({
			message: msg
		})
	}
	else {
		next()
	}
}