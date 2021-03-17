"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TokenBrokerService = void 0;
var core_1 = require("@angular/core");
var axios_1 = require("axios");
var environment_1 = require("../../environments/environment");
var TokenBrokerService = /** @class */ (function () {
    function TokenBrokerService() {
    }
    TokenBrokerService.prototype.getIdentificationToken = function (email, password) {
        var url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + environment_1.environment.firebaseConfig.apiKey;
        var data = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        return axios_1["default"]({
            method: 'POST',
            headers: { 'content-type': 'application/json; charset=utf-8' },
            url: url,
            data: data
        })
            .then(function (response) {
            console.log("idToken", response.data.idToken);
            return response.data.idToken;
        })["catch"](function (error) {
            console.error(error);
            // throw new Error(error);
        });
    };
    TokenBrokerService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], TokenBrokerService);
    return TokenBrokerService;
}());
exports.TokenBrokerService = TokenBrokerService;
var k = new TokenBrokerService();
k.getIdentificationToken('amin@pe.fr', 'E5g@0x10v7PM');
