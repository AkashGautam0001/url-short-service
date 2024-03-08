const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
	// const userUid = req.cookies?.uid;
	// if (!userUid) return res.redirect("/login");
	// const user = getUser(userUid);
	// if (!user) return res.redirect("/login");
	// req.user = user;
	// next();

	const userUid = req.headers["authorization"];
	if (!userUid) return res.redirect("/login");
	const token = userUid.split(" ")[1];
	const user = getUser(token);
	if (!user) return res.redirect("/login");
	req.user = user;
	next();
}
async function checkAuth(req, res, next) {
	// const userUid = req.cookies?.uid;
	// const user = getUser(userUid);

	const userUid = req.headers["authorization"];
	const token = userUid.split(" ")[1];
	const user = getUser(token);

	req.user = user;
	next();
}
module.exports = {
	restrictToLoggedinUserOnly,
	checkAuth,
};
