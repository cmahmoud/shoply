const router = require("express").Router();
const Controller = require("../controllers/user.controller");

router.route("/profile").get(Controller.profile).put(Controller.updateProfile);
router.route("/login").post(Controller.login);
router.route("/register").post(Controller.register);

module.exports = router;
