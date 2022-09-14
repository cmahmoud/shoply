const User = require("../models/user.model");
const isAuthenticated = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
const isValidId = require("../middleware/validateId");
const Product = require("../models/product.model");
const Order = require("../models/order.model");

// @desc Get user profile
// @route /api/user/profile
// @method Get
// @access Private
module.exports.profile = [
    isAuthenticated,
    async (req, res) => {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json({
            id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            email: user.email,
        });
    },
];

// @desc Get all users
// @route /api/user
// @method Get
// @access Private
module.exports.getAll = [
    isAuthenticated,
    isAdmin,
    async (req, res) => {
        const users = await User.find({}).select("-password");
        res.status(200).json(users);
    },
];
// @desc Get user by id
// @route /api/user/:id
// @method Get
// @access Private
module.exports.getUserById = [
    isAuthenticated,
    async (req, res) => {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(400).json({ message: "invalid email" });
        }
        res.status(200).json(user);
    },
];

// @desc Update user profile
// @route /api/user/profile
// @method PUT
// @access Private
module.exports.updateProfile = [
    isAuthenticated,
    async (req, res) => {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(400).json({ message: "invalid id" });
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        await user.save();
        const token = user.generateToken();
        res.status(200).json({
            token,
            id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            email: user.email,
        });
    },
];
// @desc Update user profile
// @route /api/user/profile
// @method PUT
// @access Private
module.exports.updateUserById = [
    isAuthenticated,
    isAdmin,
    async (req, res) => {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(400).json({ message: "invalid id" });
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;

        await user.save();
        res.status(200).json({
            id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            email: user.email,
        });
    },
];

// @desc delete user
// @route /api/user/:id/delete
// @method DELETE
// @access Private
module.exports.deleteUser = [
    isAuthenticated,
    isValidId,
    async (req, res) => {
        const user = await User.findById(req.params.id);
        const admin = await User.findById(req.user.id);
        const isEqual = user._id.equals(admin._id) || admin.isAdmin;
        if (!isEqual) {
            return res.status(401).json({ message: "Access Denied" });
        }
        await user.remove();
        await Product.deleteMany({ user: user._id });
        await Order.deleteMany({ user: user._id });
        res.status(200).send({
            message: "user deleted successfully",
            id: user.id,
        });
    },
];

// @desc Auth user & get token
// @route /api/user/login
// @method POST
// @access Public
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email" });
    }
    const isValidPassword = await user.matchPassword(password);
    if (!isValidPassword) {
        return res.status(400).json({ message: "Wrong password" });
    }
    const token = user.generateToken();
    res.status(200).json({
        token,
        id: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
        email: user.email,
    });
};

// @desc Register new user
// @route /api/user/register
// @method POST
// @access Public
module.exports.register = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    const admin = isAdmin || false;
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    user = new User({ name, email, password, isAdmin: admin });
    await user.save();
    const token = user.generateToken();
    res.status(200).json({
        token,
        id: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
        email: user.email,
    });
};
