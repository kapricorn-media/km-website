const bodyParser = require("body-parser");
const cson = require("cson");
const express = require("express");
const fs = require("fs");
const https = require("https");
const path = require("path");
const util = require("util");

const PORT_HTTPS = 8080;

const privateKey = fs.readFileSync("./keys/privkey.pem", "utf8");
const cert = fs.readFileSync("./keys/cert.pem", "utf8");
const ca = fs.readFileSync("./keys/chain.pem", "utf8");

const credentials = {
	key: privateKey,
	cert: cert,
	ca: ca
};

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));

// Serve post entries
app.post("/posts", function(req, res) {
	var MAX_POSTS = 20;

	var type = req.query.type;
	if (typeof(type) !== "string") {
		res.status(400);
		res.send("Type argument invalid");
		return;
	}

	var names = req.body;
	if (!Array.isArray(names) || names.length > MAX_POSTS) {
		res.status(400);
		res.send("Names not an array or larger than "
			+ MAX_POSTS + " elements");
		return;
	}

	var result = [];
	for (var i = 0; i < names.length; i++) {
		var postFilePath = path.join(__dirname, "/posts", type,
			names[i] + ".cson");
		try {
			var postData = cson.parse(fs.readFileSync(postFilePath));
		} catch (e) {
			res.status(400);
			res.send("Requested non-existent file: " + postFilePath);
			return;
		}
		result.push(postData);
	}

	res.send(result);
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT_HTTPS, function() {
	console.log("HTTPS server listening on port " + PORT_HTTPS);
});

