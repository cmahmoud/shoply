const ObjectId = require("mongoose").Types.ObjectId;

module.exports = (req, res, next) => {
    const isValid = ObjectId.isValid(req.params.id);
    if (!isValid) {
        next({ message: "invalid id", code: 400 });
    }
    next();
};
