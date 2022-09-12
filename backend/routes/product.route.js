const router = require("express").Router();
const Product = require("../models/product.model.js");

const Controller = require("../controllers/product.controller");

// @desc Fetch All Products
// @route /api/products
// @method GET
// @access Public
router.route("/").get(Controller.getAll);

// @desc Fetch Single Product
// @route /api/products/:id
// @method GET
// @access Public
router.route("/:id").get(Controller.getById);

module.exports = router;
