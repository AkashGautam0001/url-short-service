const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const { setUser } = require("../service/auth");
const express = require("express");
async function handleUserSign(req, res) {
	const { name, email, password } = req.body;
	try {
		const data = await User.create({
			name,
			email,
			password,
		});
		return res.render("home");
	} catch (err) {
		console.log("error while creating data in database", err);
		return res.send({ err: "err" });
	}
}
async function handleUserSLogin(req, res) {
	const { email, password } = req.body;
	const user = await User.findOne({ email, password });
	if (!user)
		return res.render("login", {
			error: "Invalid Username or Password",
		});

	//statefull auth
	// const sessionId = uuidv4();
	// setUser(sessionId, user);
	// res.cookie("uid", sessionId);

	//stateless auth
	const token = setUser(user);
	res.cookie("token", token);
	return res.redirect("/");

	//token authorization
	// const token = setUser(user);
	// return res.json({ token });
}

module.exports = {
	handleUserSign,
	handleUserSLogin,
};
