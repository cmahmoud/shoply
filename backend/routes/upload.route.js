const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(
            null,
            `product-${file.fieldname}-${Date.now()}${path.extname(
                file.originalname
            )}`
        );
    },
});
function checkFileType(file, cb) {
    const types = /jpg|jpeg|png/;
    const extname = types.test(path.extname(file.originalname).toLowerCase());
    const mimetype = types.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    cb("images only");
}
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

router.post("/", upload.single("image"), async (req, res) => {
    res.status(200).json({
        image: `/${req.file.destination}${req.file.filename}`,
    });
});

module.exports = router;
