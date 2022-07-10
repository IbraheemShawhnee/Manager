const { billSchema, logSchema, userSchema, payeeSchema, chequeSchema } = require("../../schemas.js");
const ExpressError = require("../../utils/ExpressError");

module.exports.validateBill = (req, res, next) => {
	const { error } = billSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new ExpressError(msg, 400)
	}
	else {
		next()
	}
}

module.exports.validateLog = (req, res, next) => {
	const { error } = logSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new ExpressError(msg, 400)
	}
	else {
		next()
	}
}

module.exports.validateUser = (req, res, next) => {
	const { error } = userSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new ExpressError(msg, 400)
	}
	else {
		next()
	}
}

module.exports.validatePayee = (req, res, next) => {
	const { error } = payeeSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new ExpressError(msg, 400)
	}
	else {
		next()
	}
}

module.exports.validateCheque = (req, res, next) => {
	const { error } = chequeSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new ExpressError(msg, 400)
	}
	else {
		next()
	}
}