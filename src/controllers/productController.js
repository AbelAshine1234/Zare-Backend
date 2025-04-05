const {
    createProductService,
    getProductsByCategoryService,
    getProductsBySellerService,
    addImageToProductService,
    deleteProductService,
} = require('../services/productService');
const {
    validateCreateProduct,
    validateImageData,
} = require('../validations/productValidator');

const createProduct = async (req, res) => {
    try {
        const validationErrors = validateCreateProduct(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        const product = await createProductService(req.user.id, req.body);
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await getProductsByCategoryService(categoryId);
        res.status(200).json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

const getProductsBySeller = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const products = await getProductsBySellerService(sellerId);
        res.status(200).json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

const addImageToProduct = async (req, res) => {
    try {
        const validationErrors = validateImageData(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        const image = await addImageToProductService(req.params.productId, req.body);
        res.status(201).json({ message: "Image added successfully", image });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await deleteProductService(req.params.productId);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getProductsByCategory,
    getProductsBySeller,
    addImageToProduct,
    deleteProduct,
};
