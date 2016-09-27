var userController = function (UserModel) {
    var _ = require("underscore")._;
    var self = this;

    //// --------------HTTP methods--------------////
    this.post = function (req, res) {
        _.extend(self, req.body);

        var errorValidation = self.getValidationMessage();
        if (errorValidation) {
            res.status(400);
            res.send(errorValidation);
        }
        else {
            var user = new UserModel(req.body);
            user.save();
            res.status(201);
            res.send(user);
        }
    };

    this.get = function (req, res) {
        var query = {};
        if (req.query.name) {
            query.name = req.query.name;
        }

        UserModel.find(query, function (err, users) {
            if (err) {
                res.stattus(500).send(err);
            } else {
                res.json(users);
            }
        });
    };

    //// --------------validations--------------////
    this.nameIsValid = function () {
        return self.name && self.name.length >= 10;
    };

    this.loginIsValid = function () {
        return self.login && self.login.length >= 5;
    };
    this.getValidationMessage = function () {
        if (!self.nameIsValid()) {
            return "Name is required";
        }
        if (!self.loginIsValid()) {
            return "Login is required";
        }
        return false;
    };
};

module.exports = userController;