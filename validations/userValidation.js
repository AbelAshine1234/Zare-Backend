// validations/userValidation.js
const customJoi = require('../utils/customJoi');

const registerUserSchema = customJoi.object({
  name: customJoi.string().min(3).max(50).required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name is required.',
    'string.min': 'Name must be at least 3 characters long.',
    'string.max': 'Name must not exceed 50 characters.',
    'any.required': 'Name is required.',
  }),
  surname: customJoi.string().min(3).max(50).messages({
    'string.base': 'Surname must be a string.',
    'string.empty': 'Surname cannot be empty if provided.',
    'string.min': 'Surname must be at least 3 characters long.',
    'string.max': 'Surname must not exceed 50 characters.',
  }),
  phone_number: customJoi
    .string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be a valid international format.',
      'string.empty': 'Phone number is required.',
      'any.required': 'Phone number is required.',
    }),
  email: customJoi.string().email().messages({
    'string.email': 'Email must be a valid email address.',
  }),
  password: customJoi
    .string()
    .min(6)
    .max(20)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long.',
      'string.max': 'Password must not exceed 20 characters.',
      'string.empty': 'Password is required.',
      'any.required': 'Password is required.',
    }),
  role: customJoi
    .string()
    .valid('superadmin', 'admin', 'seller', 'customer', 'driver')
    .required()
    .messages({
      'any.only': 'Role must be one of: superadmin, admin, seller, customer, driver.',
      'any.required': 'Role is required.',
    }),
}).options({ stripUnknown: true });

const verifyOTPSchema = customJoi.object({
  phone_number: customJoi
    .string()
    .pattern(/^(\+2519\d{8}|09\d{8})$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be in the format +2519XXXXXXXX or 09XXXXXXXX.',
      'string.empty': 'Phone number is required.',
      'any.required': 'Phone number is required.',
    }),
  otp: customJoi
    .string()
    .length(6)
    .pattern(/^\d{6}$/)
    .required()
    .messages({
      'string.length': 'OTP must be exactly 6 digits.',
      'string.pattern.base': 'OTP must be a valid 6-digit number.',
      'string.empty': 'OTP is required.',
      'any.required': 'OTP is required.',
    }),
}).options({ stripUnknown: true });

const loginUserSchema = customJoi.object({
  phone_number: customJoi
    .string()
    .pattern(/^(\+2519\d{8}|09\d{8})$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be in the format +2519XXXXXXXX or 09XXXXXXXX.',
      'string.empty': 'Phone number is required.',
      'any.required': 'Phone number is required.',
    }),
  password: customJoi
    .string()
    .min(6)
    .max(20)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long.',
      'string.max': 'Password must not exceed 20 characters.',
      'string.empty': 'Password is required.',
      'any.required': 'Password is required.',
    }),
}).options({ stripUnknown: true });

const attachAddressSchema = customJoi.object({
  address_id: customJoi.number().integer().positive().required().messages({
    'any.required': 'Address ID is required.',
    'number.base': 'Address ID must be a number.',
    'number.integer': 'Address ID must be an integer.',
    'number.positive': 'Address ID must be a positive number.',
  })
}).options({ stripUnknown: true });

module.exports = { loginUserSchema, registerUserSchema, verifyOTPSchema,attachAddressSchema };
