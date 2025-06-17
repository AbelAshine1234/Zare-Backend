// validations/addressValidation.js
const customJoi = require('../utils/customJoi');

const createAddressSchema = customJoi.object({
  country: customJoi.string().required().messages({
    'any.required': 'Country is required.',
    'string.empty': 'Country cannot be empty.',
  }),
  state: customJoi.string().allow(null, '').optional(),
  city: customJoi.string().required().messages({
    'any.required': 'City is required.',
    'string.empty': 'City cannot be empty.',
  }),
  street: customJoi.string().required().messages({
    'any.required': 'Street is required.',
    'string.empty': 'Street cannot be empty.',
  }),
  postal_code: customJoi.string().allow(null, '').optional(),
  formatted_address: customJoi.string().required().messages({
    'any.required': 'Formatted address is required.',
    'string.empty': 'Formatted address cannot be empty.',
  }),
  latitude: customJoi.number().optional(),
  longitude: customJoi.number().optional(),
  place_id: customJoi.string().allow(null, '').optional(),
});

const updateAddressSchema = customJoi.object({
  country: customJoi.string().optional(),
  state: customJoi.string().allow(null, '').optional(),
  city: customJoi.string().optional(),
  street: customJoi.string().optional(),
  postal_code: customJoi.string().allow(null, '').optional(),
  formatted_address: customJoi.string().optional(),
  latitude: customJoi.number().optional(),
  longitude: customJoi.number().optional(),
  place_id: customJoi.string().allow(null, '').optional(),
}).min(1).messages({
  'object.min': 'At least one field must be provided for update.',
});

module.exports = {
  createAddressSchema,
  updateAddressSchema,
};
