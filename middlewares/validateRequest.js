const validateRequest = (schema) => (req, res, next) => {
    // Combine req.body (text fields) with req.files (multiple images)
    const data = { ...req.body, pictures: req.files }; // Add `pictures` field to represent uploaded files

    // Validate the combined data
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
        const errors = error.details.reduce((acc, curr) => {
            acc[curr.path[0]] = curr.message;
            return acc;
        }, {});

        return res.status(400).json({ message: 'Validation failed', errors });
    }

    next();
};

module.exports = validateRequest;
