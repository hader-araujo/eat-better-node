var assert = require("assert");
var sinon = require("sinon");

describe("Post User controller", function () {
    var UserModel;
    var response;
    var controller;
    beforeEach(function () {
        UserModel = function (user) {
        };
        UserModel.prototype.save = sinon.spy();
        response = {
            status: sinon.spy(),
            send: sinon.spy()
        };
        var UserController = require("../controllers/user_controller");
        controller = new UserController(UserModel);
    });

    describe("It is not valid if...", function () {
        it("Name is empty", function () {
            var req = {
                body: {
                    login: "hader-araujo",
                }
            };
            controller.post(req, response);

            sinon.assert.notCalled(UserModel.prototype.save);
            assert(!controller.nameIsValid(), "Name should not be valid");
            sinon.assert.calledWithExactly(response.status, 400);
            sinon.assert.calledWithExactly(response.send, "Name is required");
        });
        it("Login is empty", function () {
            var req = {
                body: {
                    name: "Hader Araujo"
                }
            };
            controller.post(req, response);

            sinon.assert.notCalled(UserModel.prototype.save);
            assert(!controller.loginIsValid(), "Login should not be valid");
            sinon.assert.calledWithExactly(response.status, 400);
            sinon.assert.calledWithExactly(response.send, "Login is required");
        });
    });
    describe("Correct fields", function () {
        it("Should return success", function () {
            var req = {
                body: {
                    name: "Hader Araujo",
                    login: "hader-araujo"
                }
            };
            controller.post(req, response);
            sinon.assert.calledOnce(UserModel.prototype.save);
            assert(!controller.getErrorValidation(), "It should not have validation error");
            sinon.assert.calledWithExactly(response.status, 201);
            //TODO sinon.assert.calledWithExactly(response.send, );

        });
    });
});