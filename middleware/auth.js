const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
	const tokenCookie = req.cookies?.token;
	req.user = null;
	if (!tokenCookie) return next();
	const token = tokenCookie;
	const user = getUser(token);
	req.user = user;
	return next();
}

function restructTo(roles) {
	return function (req, res, next) {
		if (!req.user) return res.redirect("/login");
		if (!roles.includes(req.user.role)) return res.end("Unauthorizes ||");
		return next();
	};
}
module.exports = {
	checkForAuthentication,
	restructTo,
};

// Now below code is work same as code which given above
/* async function restrictToLoggedinUserOnly(req, res, next) {
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
*/
