var express = require("express");

var routes = function (UserModel) {

    var userRouter = express.Router();
    var controller = require("../controllers/user_controller.js");
    var userController = new controller(UserModel);
    ////////////   //user      /////////////////////
    userRouter.route("/")

        .post(userController.post)
        .get(userController.get);

    //////////   //user/:id      ///////////////////// 
    userRouter.route("/:id")

        .get(function (req, res) {

            UserModel.findById(req.params.id, function (err, user) {
                if (err) {
                    res.stattus(500).send(err);
                } else {
                    res.json(user);
                }
            })
        });


    return userRouter;
};

module.exports = routes;