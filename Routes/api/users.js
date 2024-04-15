const express = require("express");
const userController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verityRoles = require("../../middleware/verifyRoles");
const router = express.Router();

router.route("/")
    .get(verityRoles(ROLES_LIST.Admin), userController.getAllUsers)
    .delete(verityRoles(ROLES_LIST.Admin), userController.deleteUser);

router.route("/:id").get(verityRoles(ROLES_LIST.Admin), userController.getUserById);


module.exports = router;