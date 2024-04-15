const express = require("express");
const employeesController = require("../../controllers/employeesController");
const router = express.Router();
const ROLES_LIST = require("../../config/roles_list");
const verifyRole = require("../../middleware/verifyRoles");
// instead of writing like router.get ,router.post , we can use the router.route("/") and its respective http methods for this endpoint

router.route("/")
    .get(employeesController.getAllEmployees)
    .post(verifyRole(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    .put(verifyRole(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    .delete(verifyRole(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployeeById);


module.exports = router;

