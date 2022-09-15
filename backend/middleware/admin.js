const User = require("../models/user.model");

module.exports = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(401).json({ message: "invalid id" });
    }
    if (!user.isAdmin) {
        return res.status(401).json({ message: "Access Denied" });
    }
    next();
};
