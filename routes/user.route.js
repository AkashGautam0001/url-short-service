const express = require("express");
const router = express.Router();
const { handleUserSign, handleUserSLogin } = require("../controllers/user.controller");

router.post("/", handleUserSign);
router.post("/login", handleUserSLogin);

module.exports = router;
