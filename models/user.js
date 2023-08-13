const Joi = require('joi');
const mongoose = require('mongoose');
const { saveErrorHandler } = require('../helpers');

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchema = new mongoose.Schema(
    {
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ['starter', 'pro', 'business'],
            default: 'starter',
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        token: {
            type: String,
            default: '',
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.post('save', saveErrorHandler);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    token: Joi.string(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const schemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
};

const User = mongoose.model('user', userSchema);

module.exports = {
    User,
    schemas,
};
