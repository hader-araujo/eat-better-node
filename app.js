function bodyParser(app) {
    var bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
}

//DB connect
require("./models/db_connect");

var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

bodyParser(app);

var UserModel = require("./models/user_model");
require("./routes/app_routes")(app, UserModel);

app.listen(port, function (err) {
    console.log("Running server on port " + port);
});