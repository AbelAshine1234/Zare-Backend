const Joi = require('joi');

const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        "string.base": "Name must be a string.",
        "string.empty": "Name is required.",
        "string.min": "Name must be at least 3 characters long.",
        "string.max": "Name must not exceed 50 characters.",
        "any.required": "Name is required."
    }),
    surname: Joi.string().min(3).max(50).required().messages({
        "string.base": "Surname must be a string.",
        "string.empty": "Surname is required.",
        "string.min": "Surname must be at least 3 characters long.",
        "string.max": "Surname must not exceed 50 characters.",
        "any.required": "Surname is required."
    }),
    phone_number: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required().messages({
        "string.pattern.base": "Phone number must be a valid international format.",
        "string.empty": "Phone number is required.",
        "any.required": "Phone number is required."
    }),
    email: Joi.string().email().messages({
        "string.email": "Email must be a valid email address."
    }),
    
    password: Joi.string().min(6).max(20).required().messages({
        "string.min": "Password must be at least 6 characters long.",
        "string.max": "Password must not exceed 20 characters.",
        "string.empty": "Password is required.",
        "any.required": "Password is required."
    }),
    role: Joi.string().valid('superadmin', 'admin', 'seller', 'customer', 'driver').required().messages({
        "any.only": "Role must be one of: superadmin, admin, seller, customer, driver.",
        "any.required": "Role is required."
    })
});

const verifyOTPSchema = Joi.object({
    phone_number: Joi.string()
    .pattern(/^(\+2519\d{8}|09\d{8})$/) // Accepts +2519XXXXXXXX or 09XXXXXXXX
    .required()
    .messages({
        "string.pattern.base": "Phone number must be in the format +2519XXXXXXXX or 09XXXXXXXX.",
        "string.empty": "Phone number is required.",
        "any.required": "Phone number is required."
    }),
    otp: Joi.string().length(6).pattern(/^\d{6}$/).required().messages({
        "string.length": "OTP must be exactly 6 digits.",
        "string.pattern.base": "OTP must be a valid 6-digit number.",
        "string.empty": "OTP is required.",
        "any.required": "OTP is required."
    })
});



const loginUserSchema = Joi.object({
    phone_number: Joi.string()
    .pattern(/^(\+2519\d{8}|09\d{8})$/) // Accepts +2519XXXXXXXX or 09XXXXXXXX
    .required()
    .messages({
        "string.pattern.base": "Phone number must be in the format +2519XXXXXXXX or 09XXXXXXXX.",
        "string.empty": "Phone number is required.",
        "any.required": "Phone number is required."
    }),
    password: Joi.string().min(6).max(20).required().messages({
        "string.min": "Password must be at least 6 characters long.",
        "string.max": "Password must not exceed 20 characters.",
        "string.empty": "Password is required.",
        "any.required": "Password is required."
    })
});


module.exports = { loginUserSchema,registerUserSchema,verifyOTPSchema };
