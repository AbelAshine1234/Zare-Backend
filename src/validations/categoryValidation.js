const Joi = require("joi");

const categoryValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": "Category name must be at least 3 characters long.",
            "string.max": "Category name must not exceed 50 characters.",
            "string.empty": "Category name is required.",
            "any.required": "Category name is required."
        }),
    description: Joi.string()
        .max(255)
        .messages({
            "string.max": "Description must not exceed 255 characters.",
            "string.empty": "Description cannot be empty."
        }),
    pictures: Joi.array().items(Joi.any()).optional().messages({
        "array.base": "Pictures must be an array of files."
    })  
});

module.exports = { categoryValidationSchema };
