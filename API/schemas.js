import BaseJoi from "joi";
import sanitizeHtml from "sanitize-html";

const extension = (joi) => ({
	type: 'string',
	base: joi.string(),
	messages: {
		'string.escapeHTML': '{{#label}} must not include HTML!'
	},
	rules: {
		escapeHTML: {
			validate(value, helpers) {
				const clean = sanitizeHtml(value, {
					allowedTags: [],
					allowedAttributes: {},
				});
				if (clean !== value) return helpers.error('string.escapeHTML', { value })
				return clean;
			}
		}
	}
});

const Joi = BaseJoi.extend(extension)


export const billSchema = new Joi.object({
	date: Joi.date().required(),
	value: Joi.number().required(),
	description: Joi.string().required().escapeHTML(),
	extraNotes: Joi.string().allow('').escapeHTML()
});

export const userSchema = new Joi.object({
	name: Joi.string().required().escapeHTML(),
	email: Joi.string().email().allow('').escapeHTML(),
	phoneNumber: Joi.string().allow('').escapeHTML()
});

export const logSchema = new Joi.object({
	log: Joi.object({
		date: Joi.required(),
		worker: Joi.required(),
		isAbsence: Joi.allow(),
		startingTime: Joi.string().allow('').escapeHTML(),
		finishingTime: Joi.string().allow('').escapeHTML(),
		OTV: Joi.number().allow(''),
		payment: Joi.number(),
		extraNotes: Joi.string().allow('').escapeHTML()
	}).required()
});

export const payeeSchema = new Joi.object({
	name: Joi.string().required().escapeHTML(),
	email: Joi.string().email().allow('').escapeHTML(),
	phoneNumber: Joi.string().allow('').escapeHTML(),
	extraNotes: Joi.string().allow('').escapeHTML(),
});

export const chequeSchema = new Joi.object({
	cheque: Joi.object({
		serial: Joi.number().min(0),
		dueDate: Joi.date().required(),
		value: Joi.number().min(0),
		description: Joi.string().allow('').escapeHTML(),
		payee: Joi.required(),
		isCancelled: Joi.allow(),
	}).required()
});