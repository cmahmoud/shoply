const Product = require("../models/product.model");
const isValidId = require("../middleware/validateId");

module.exports.getAll = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
};
module.exports.getById = [
    isValidId,
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            next({ message: "Product not found", code: 400 });
        }
        res.status(200).json(product);
    },
];
