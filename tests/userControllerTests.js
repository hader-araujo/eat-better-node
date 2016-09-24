var should = require("should");
var sinon = require("sinon");

describe("User controller tests", function () {
    describe("Post test", function () {
        it("Should not allow empty name on post", function () {
                var User = function (user) {
                    this.save = function () {};
                };

                var req = {
                    body: {
                        login: "hader-araujo",
                    }
                };

                var res = {
                    status: sinon.spy(),
                    send: sinon.spy()
                };

                var userController = require("../controllers/user_controller")(User);
                userController.post(req, res);

                res.status.calledWith(400).should.equal(true, "Bad Status: " + res.status.args[0][0]);
                res.send.calledWith("Name is required").should.equal(true, "Bad message: " + res.send.args[0][0]);
            }),
            it("Should not allow empty login on post", function () {
                var User = function (user) {
                    this.save = function () {};
                };

                var req = {
                    body: {
                        name: "Hader Araujo"
                    }
                };

                var res = {
                    status: sinon.spy(),
                    send: sinon.spy()
                };

                var userController = require("../controllers/user_controller")(User);
                userController.post(req, res);

                res.status.calledWith(400).should.equal(true, "Bad Status: " + res.status.args[0][0]);
                res.send.calledWith("Login is required").should.equal(true, "Bad message: " + res.send.args[0][0]);
            }),
            it("Should return success", function () {
                var User = function (user) {
                    this.save = function () {
                        return user
                    };
                };

                var req = {
                    body: {
                        name: "Hader Araujo",
                        login: "hader-araujo"
                    }
                };

                var res = {
                    status: sinon.spy(),
                    send: sinon.spy()
                };

                var userController = require("../controllers/user_controller")(User);
                userController.post(req, res);

                res.status.calledWith(201).should.equal(true, "Bad Status: " + res.status.args[0][0]);

                res.send.calledWith(req.body).should.equal(true, "Bad user: ");

            });
    });
});