const Product = require("../models/product.model");
const isAdmin = require("../middleware/admin");
const isValidId = require("../middleware/validateId");
const isAuthenticated = require("../middleware/auth");
const User = require("../models/user.model");

// @desc Fetch All Products
// @route /api/products
// @method GET
// @access Public
module.exports.getAll = async (req, res) => {
    const pageSize = 4;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: "i",
              },
          }
        : {};
    const count = await Product.countDocuments(keyword);
    const products = await Product.find(keyword)
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.status(200).json({
        products,
        page,
        pages: Math.ceil(count / pageSize),
    });
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
// @desc add review
// @route /api/products/:id/review
// @method POST
// @access Private
module.exports.addReview = [
    isAuthenticated,
    isValidId,
    async (req, res) => {
        const product = await Product.findById(req.params.id);
        const user = await User.findById(req.user.id);
        const isReviewed = product.reviews.find(
            (x) => x.user.toString() === user._id.toString()
        );
        if (isReviewed) {
            return res
                .status(400)
                .json({ message: "Product already reviewed" });
        }
        const review = {
            name: user.name,
            comment: req.body.comment,
            rating: Number(req.body.rating),
            user: user._id,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        const total = product.reviews.reduce(
            (acc, item) => item.rating + acc,
            0
        );
        product.rating = total / product.reviews.length;
        await product.save();
        res.status(201).json({ message: "Review Added" });
    },
];
// @desc Get Top Products
// @route /api/products/top
// @method GET
// @access Public
module.exports.getTopRated = [
    async (req, res) => {
        const products = await Product.find({}).sort({ rating: -1 }).limit(3);
        res.status(200).json(products);
    },
];
