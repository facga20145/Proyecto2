const express = require("express");
const adminController = require("../../controllers/Admin/adminController.js");
const router = express.Router();

router.post("/add", adminController.addAdmin);
router.get("/list", adminController.getAdmins);
router.put("/update/:id", adminController.updateAdminStatus);

module.exports = router;
