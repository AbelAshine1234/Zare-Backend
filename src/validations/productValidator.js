// Validators for product operations

const validateCreateProduct = (data) => {
    const errors = [];
    const { title, description, price, stock_quantity, category_id, images } = data;

    if (!title || typeof title !== 'string') errors.push("Title is required and must be a string.");
    if (!description || typeof description !== 'string') errors.push("Description is required and must be a string.");
    if (!price || typeof price !== 'number') errors.push("Price is required and must be a number.");
    if (!stock_quantity || typeof stock_quantity !== 'number') errors.push("Stock quantity is required and must be a number.");
    if (!category_id || typeof category_id !== 'number') errors.push("Category ID is required and must be a number.");
    if (images && !Array.isArray(images)) errors.push("Images must be an array if provided.");

    return errors;
};

const validateImageData = (data) => {
    const errors = [];
    const { url, alt_text } = data;

    if (!url || typeof url !== 'string') errors.push("Image URL is required and must be a string.");
    if (alt_text && typeof alt_text !== 'string') errors.push("Alt text must be a string.");

    return errors;
};

module.exports = { validateCreateProduct, validateImageData };
