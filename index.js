const express = require("express");
const path = require("path");
const app = express();
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url.model");
const { checkForAuthentication, restructTo } = require("./middleware/auth");
const PORT = 8000;

const urlRoute = require("./routes/url.route");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user.route");
const cookieParser = require("cookie-parser");

// app.get("/test", async (req, res) => {
// 	const allUrls = await URL.find({});
// 	return res.end(`
// 		<html>
// 			<head></head>
// 			<body>
// 				<ol>${allUrls.map((url) => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory}</li>`).join("")}</ol>
// 			</body>
// 		</html>`);
// });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectToMongoDB("mongodb://localhost/short-url").then(() => {
	console.log("connected mongoDb");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restructTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.use("/url/:shortId", async (req, res) => {
	const shortId = req.params.shortId;
	const entry = await URL.findOneAndUpdate(
		{
			shortId,
		},
		{
			$push: {
				visitHistory: {
					timestamp: Date.now(),
				},
			},
		}
	);

	res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));
