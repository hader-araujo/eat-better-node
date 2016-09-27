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
        sinon.spy(controller, "nameIsValid");
        sinon.spy(controller, "loginIsValid");
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
            sinon.assert.calledOnce(controller.nameIsValid);
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
            sinon.assert.calledOnce(controller.loginIsValid);
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
            sinon.assert.calledOnce(controller.nameIsValid);
            sinon.assert.calledOnce(controller.loginIsValid);
            assert(!controller.getValidationMessage(), "It should not have validation error");
            sinon.assert.calledWithExactly(response.status, 201);
            //TODO sinon.assert.calledWith(response.send, sinon.match(req.body));
        });
    });
});