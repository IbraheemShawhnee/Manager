import { billSchema, logSchema, userSchema, payeeSchema, chequeSchema } from "../schemas.js";
import ExpressError from "../utils/ExpressError.js";

export const validateBill = (req, res, next) => {
	const { error } = billSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new ExpressError(msg, 400)
	}
	else {
		next()
	}
}

export const validateLog = (req, res, next) => {
	const { error } = logSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new ExpressError(msg, 400)
	}
	else {
		next()
	}
}

export const validateUser = (req, res, next) => {
	const { error } = userSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new ExpressError(msg, 400)
	}
	else {
		next()
	}
}

export const validatePayee = (req, res, next) => {
	const { error } = payeeSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new ExpressError(msg, 400)
	}
	else {
		next()
	}
}

export const validateCheque = (req, res, next) => {
	const { error } = chequeSchema.validate(req.body)
	if (error) {
		const msg = error.details.map(el => el.message).join(',');
		throw new ExpressError(msg, 400)
	}
	else {
		next()
	}
}