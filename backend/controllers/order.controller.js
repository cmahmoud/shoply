const Order = require("../models/order.model");
const isAuthenticated = require("../middleware/auth");
const isValidId = require("../middleware/validateId");
const isAdmin = require("../middleware/admin");

// @desc get order
// @route /api/order/:id
// @method GET
// @access Private
module.exports.getOrder = [
    isAuthenticated,
    isValidId,
    async (req, res) => {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );
        if (!order) {
            return res.status(400).json({ message: "Invalid Order" });
        }
        res.status(200).json(order);
    },
];
// @desc get all orders for admin
// @route /api/order/all
// @method GET
// @access Private
module.exports.getOrders = [
    isAuthenticated,
    isAdmin,
    async (req, res) => {
        const orders = await Order.find({}).populate("user", "name email");
        res.status(200).json(orders);
    },
];
// @desc get all orders for current user
// @route /api/order/my
// @method GET
// @access Private
module.exports.getMyOrders = [
    isAuthenticated,
    async (req, res) => {
        const orders = await Order.find({ user: req.user.id });
        res.status(200).json(orders);
    },
];
// @desc pay order
// @route /api/order/:id/pay
// @method PUT
// @access Private
module.exports.payOrder = [
    isAuthenticated,
    isValidId,
    async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(400).json({ message: "Invalid Order" });
        }
        order.isPaid = true;
        order.paidAt = Date.now();
        await order.save();
        res.status(200).json(order);
    },
];
// @desc deliver order
// @route /api/order/:id/deliver
// @method PUT
// @access Private
module.exports.deliverOrder = [
    isAuthenticated,
    isAdmin,
    isValidId,
    async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(400).json({ message: "Invalid Order" });
        }
        order.isDelevered = true;
        order.deleverdAt = Date.now();
        await order.save();
        res.status(200).json(order);
    },
];

// @desc create order
// @route /api/order
// @method POST
// @access Private
module.exports.orderItems = [
    isAuthenticated,
    async (req, res) => {
        const order = new Order({
            ...req.body,
            user: req.user.id,
        });
        order.save();
        res.status(200).json(order);
    },
];
