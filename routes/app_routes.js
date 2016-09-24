var routes = function (app, UserModel) {

    var serverName = "eatbetterserver";

    var userRouter = require("./user_routes")(UserModel);
    
    app.get("/", function (req, res) {
        res.send("eat better API");
    })
    
    app.use("/" + serverName + "/user", userRouter);

    

};

module.exports = routes;