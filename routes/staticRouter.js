const express = require("express");
const URL = require("../models/url.model");
const router = express.Router();
router.get("/", async (req, res) => {
	const allUrls = await URL.find({});
	return res.render("home", {
		urls: allUrls,
	});
});

router.get("/signup", (req, res) => {
	return res.render("signup");
});

router.get("/user/login", (req, res) => {
	return res.render("login");
});
module.exports = router;
