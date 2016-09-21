var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var db = mongoose.connect("mongodb://localhost/eatBetterDB");

var User = require("./models/userModel");
var app = express();
var port = process.env.PORT;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var serverName = "eatbetterserver";

var userRouter = express.Router();

userRouter.route("/user")
    .post(function (req, res) {
        var user = new User(req.body);
        user.save();
        res.status(2001).send(user);
    })
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err) {
                res.stattus(500).send(err);
            } else {
                res.json(users);
            }
        })

    });

app.use("/" + serverName, userRouter);

app.get("/", function (req, res) {
    res.send("eat better API");
})

app.listen(port, function (err) {
    console.log("Running server on port " + port);
});