"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var auth_service_1 = require('../_services/auth.service');
var document_service_1 = require('../_services/document.service');
var router_1 = require('@angular/router');
var RegisterComponent = (function () {
    function RegisterComponent(_authService, _docService, _router) {
        this._authService = _authService;
        this._docService = _docService;
        this._router = _router;
        this.email = "";
        this.password = "";
        // public user = new User('','');
        this.errorMsg = '';
        console.log('home');
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        if (this.password === this.password2) {
            var user = new auth_service_1.User(this.email, this.password);
            console.log(user);
            this._authService.create(user)
                .then(function (sucess) {
                _this._docService.initializeDB(_this.email);
                _this._router.navigate(['/login']);
            }, function (error) { return _this.errorMsg = 'There was an error creating this user'; });
        }
        else {
            alert("Passwords do not match");
        }
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'login-form',
            providers: [auth_service_1.AuthenticationService, document_service_1.DocumentService],
            templateUrl: "./app/register/register.component.html"
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthenticationService, document_service_1.DocumentService, router_1.Router])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
