function userValidation(req, res, user) {

    if (!req.body.name) {
        res.status(400);
        res.send("Name is required");
        return false;
    }

    if (!req.body.login) {
        res.status(400);
        res.send("Login is required");
        return false;
    }

    return true;

}

var userController = function (UserModel) {

    var post = function (req, res) {
        var user = new UserModel(req.body);

        if (!userValidation(req, res)) {
            return;
        }

        user.save();
        res.status(201);
        res.send(user);
    };

    var get = function (req, res) {

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

    return {
        post: post,
        get: get
    };
};

module.exports = userController;