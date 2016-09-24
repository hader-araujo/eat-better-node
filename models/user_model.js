var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userModel = new Schema({
    name: {
        type: String
    },
    login: {
        type: String
    }
});

module.exports = mongoose.model("User", userModel);