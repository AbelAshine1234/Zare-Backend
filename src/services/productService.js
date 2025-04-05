const { Product, Category, User, Image } = require('../models');

const createProductService = async (userId, productData) => {
    const user = await User.findByPk(userId);
    if (!user || user.role !== 'seller') {
        throw new Error("Only sellers can add products.");
    }

    const category = await Category.findByPk(productData.category_id);
    if (!category) {
        throw new Error("Category not found.");
    }

    const product = await Product.create({
        title: productData.title,
        description: productData.description,
        price: productData.price,
        stock_quantity: productData.stock_quantity,
        category_id: productData.category_id,
        owner_id: userId,
    });

    if (productData.images && productData.images.length > 0) {
        const imagePromises = productData.images.map(async (img) => {
            return await Image.create({
                url: img.url,
                alt_text: img.alt_text,
                product_id: product.id,
            });
        });
        await Promise.all(imagePromises);
    }

    return product;
};

const getProductsByCategoryService = async (categoryId) => {
    const category = await Category.findByPk(categoryId, {
        include: [{
            model: Product,
            as: 'products',
            include: [{
                model: Image,
                as: 'images',
            }],
        }],
    });

    if (!category) {
        throw new Error("Category not found.");
    }

    return category.products;
};

const getProductsBySellerService = async (sellerId) => {
    const seller = await User.findByPk(sellerId);

    if (!seller || seller.role !== 'seller') {
        throw new Error("Seller not found or is not authorized.");
    }

    const products = await Product.findAll({
        where: { owner_id: sellerId },
        include: [{
            model: Image,
            as: 'images',
        }],
    });

    return products;
};

const addImageToProductService = async (productId, imageData) => {
    const product = await Product.findByPk(productId);
    if (!product) {
        throw new Error("Product not found.");
    }

    const image = await Image.create({
        url: imageData.url,
        alt_text: imageData.alt_text,
        product_id: productId,
    });

    return image;
};

const deleteProductService = async (productId) => {
    const product = await Product.findByPk(productId);
    if (!product) {
        throw new Error("Product not found.");
    }

    const images = await Image.findAll({ where: { product_id: productId } });
    if (images.length > 0) {
        images.forEach(async (image) => {
            const fs = require('fs');
            if (fs.existsSync(image.url)) {
                fs.unlinkSync(image.url);
            }
            await image.destroy();
        });
    }

    await product.destroy();
};

module.exports = {
    createProductService,
    getProductsByCategoryService,
    getProductsBySellerService,
    addImageToProductService,
    deleteProductService,
};
