const Product = require("../models/product.model");
const isValidId = require("../middleware/validateId");

// @desc Fetch All Products
// @route /api/products
// @method GET
// @access Public
module.exports.getAll = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
};
// @desc Fetch Single Product
// @route /api/products/:id
// @method GET
// @access Public
module.exports.getById = [
    isValidId,
    async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    },
];
