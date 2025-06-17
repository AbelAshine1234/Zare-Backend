const Joi = require('joi');

const customJoi = Joi.defaults((schema) => {
  return schema.options({
    stripUnknown: true,
    abortEarly: false, // Optional: to collect all errors
  });
});

module.exports = customJoi;
