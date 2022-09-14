const Product = require("../models/product.model");
const isAdmin = require("../middleware/admin");
const isValidId = require("../middleware/validateId");
const isAuthenticated = require("../middleware/auth");

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
// @desc Create Product
// @route /api/products/
// @method POST
// @access Private
module.exports.createProduct = [
    isAuthenticated,
    isAdmin,
    async (req, res) => {
        const product = new Product({
            name: "sample",
            price: 0,
            user: req.user.id,
            image: "/images/sample.jpg",
            brand: "Sample",
            category: "sample",
            countInStock: 0,
            numReviews: 0,
            rating: 1,
            description: "sample desc",
        });
        await product.save();
        res.status(200).json(product);
    },
];
// @desc Update Product
// @route /api/products/:id/update
// @method PUT
// @access Private
module.exports.updateProduct = [
    isAuthenticated,
    isAdmin,
    isValidId,
    async (req, res) => {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );
        res.status(200).json(product);
    },
];
// @desc Delete Product
// @route /api/products/:id/delete
// @method DELETE
// @access Private
module.exports.deleteProduct = [
    isAuthenticated,
    isAdmin,
    isValidId,
    async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({ message: "Product not found" });
        }
        await product.remove();
        res.status(200).json({ id: product._id });
    },
];
