const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const cson = require("cson");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "/public")));
app.listen(port, function() {
    console.log("App listening on port " + port);
});

// Serve post entries
app.get("/posts", function(req, res) {
    var type = req.query.type;
    var names = req.query.names;
    if (typeof(type) !== "string") {
        res.sendStatus(400);
        return;
    }
    if (typeof(names) !== "string") {
        res.sendStatus(400);
        return;
    }
    try {
        names = JSON.parse(names);
    } catch (e) {
        res.sendStatus(400);
        return;
    }
    if (!Array.isArray(names) || names.length > 20) {
        res.sendStatus(400);
        return;
    }

    var result = [];
    for (var i = 0; i < names.length; i++) {
        var postFilePath = path.join("posts", type, names[i] + ".cson");
        try {
            var postData = cson.parse(fs.readFileSync(postFilePath));
        } catch (e) {
            res.sendStatus(400);
            return;
        }
        result.push(postData);
    }

    res.send(result);
});