const router = require("express").Router();
const Controller = require("../controllers/user.controller");

router.route("/").get(Controller.getAll);
router.route("/:id").get(Controller.getUserById).put(Controller.updateUserById);
router.route("/profile").get(Controller.profile).put(Controller.updateProfile);
router.route("/login").post(Controller.login);
router.route("/register").post(Controller.register);
router.route("/:id/delete").delete(Controller.deleteUser);

module.exports = router;
