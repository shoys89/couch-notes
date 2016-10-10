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
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var User = (function () {
    function User(email, password) {
        this.email = email;
        this.password = password;
    }
    return User;
}());
exports.User = User;
var AuthenticationService = (function () {
    function AuthenticationService(_router, http) {
        this._router = _router;
        this.http = http;
        this._endPointUrl = "http://104.197.22.134:5984/_session";
        this._rootEndPointUrl = "http://admin:admin@104.197.22.134:5984/_users/org.couchdb.user:";
    }
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem("user");
        this._router.navigate(['Login']);
    };
    AuthenticationService.prototype.login = function (user) {
        var body = JSON.stringify({ name: user.email, password: user.password });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this._endPointUrl, body, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    AuthenticationService.prototype.create = function (user) {
        var url = this._rootEndPointUrl + user.email;
        var body = JSON.stringify({ name: user.email, password: user.password, roles: [], type: 'user' });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(url, body, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    AuthenticationService.prototype.checkCredentials = function () {
        if (localStorage.getItem("user") === null) {
            return false;
        }
        return true;
    };
    AuthenticationService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    AuthenticationService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Hey Couch db Server error';
        console.error(errMsg); // log to console instead
        //return Promise.reject(errMsg);
    };
    AuthenticationService.prototype.getCurrentUser = function () {
        var username = localStorage.getItem("user");
        return new User(username, 'Encrypted');
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
