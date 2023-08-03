const Joi = require('joi');
const mongoose = require('mongoose');
const { saveErrorHandler } = require('../helpers');

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false, timestamps: true }
);

contactSchema.post('save', saveErrorHandler);

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string()
        .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
        .required(),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const schemas = {
    addSchema,
    updateFavoriteSchema,
};

const Contact = mongoose.model('contact', contactSchema);

module.exports = {
    Contact,
    schemas,
};
