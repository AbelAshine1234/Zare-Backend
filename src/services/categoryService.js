const Category = require('../models/Category');

const createCategory = async (data) => {
    const category = await Category.create(data);
    return category;
};

const getAllCategories = async () => {
    return await Category.findAll();
};

const getCategoryById = async (id) => {
    return await Category.findByPk(id);
};

const updateCategory = async (id, data) => {
    const category = await getCategoryById(id);
    if (category) {
        await category.update(data);
        return category;
    }
    return null;
};

const deleteCategory = async (id) => {
    const category = await getCategoryById(id);
    if (category) {
        await category.destroy();
        return true;
    }
    return false;
};

module.exports = { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory };
