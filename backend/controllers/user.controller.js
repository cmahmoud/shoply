const User = require("../models/user.model");
const isAuthenticated = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

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
