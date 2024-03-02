const express = require("express");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url.model");
const urlRoute = require("./routes/url.route");

const app = express();
const PORT = 8001;
app.use(express.json());

app.use("/url", urlRoute);
connectToMongoDB("mongodb://localhost/short-url").then(() => {
	console.log("connected mongoDb");
});

app.use("/:shortId", async (req, res) => {
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
