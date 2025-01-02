const bodyParser = require("body-parser");
const cson = require("cson");
const express = require("express");
const fs = require("fs");
const http = require("http");
const path = require("path");
const util = require("util");

if (process.argv.length != 3) {
    console.error("Missing HTTP server port argument");
    process.exit(1);
}
const port = parseInt(process.argv[2]);

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

const server = http.createServer(app);
server.listen(port, function() {
	console.log("HTTP server listening on port " + port);
});

