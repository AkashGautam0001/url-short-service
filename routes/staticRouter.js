const express = require("express");
const URL = require("../models/url.model");
const { restructTo } = require("../middleware/auth");
const router = express.Router();

router.get("/admin/urls", restructTo(["ADMIN"]), async (req, res) => {
	if (!req.user) return res.redirect("/login");
	const allUrls = await URL.find({});
	return res.render("home", {
		urls: allUrls,
	});
});
router.get("/", restructTo(["NORMAL", "ADMIN"]), async (req, res) => {
	if (!req.user) return res.redirect("/login");
	const allUrls = await URL.find({ createdBy: req.user._id });
	return res.render("home", {
		urls: allUrls,
	});
});

router.get("/signup", (req, res) => {
	return res.render("signup");
});

router.get("/login", (req, res) => {
	return res.render("login");
});
module.exports = router;
