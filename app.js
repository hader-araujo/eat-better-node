var express = require("express");

var app = express();

var port = process.env.PORT;

app.get("/", function (req, res) {
    res.send("Hello world!");
})

app.listen(port, function (err) {
    console.log("Running server on port " + port);
});