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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var DocumentService = (function () {
    function DocumentService(http) {
        this._endPointUrl = "http://130.211.127.182:5984/";
        this._rootEndPointUrl = "http://admin:admin@130.211.127.182:5984/";
        this._sharePrefix = "share_";
        this._privatePrefix = "personal_";
        this.http = http;
    }
    DocumentService.prototype.getAllDocs = function (user) {
        var url = this.buildConnectionString(user, this._privatePrefix);
        return this.http.get(url + '_all_docs')
            .toPromise()
            .then(function (response) { return response.json().rows; });
    };
    DocumentService.prototype.getNoteById = function (user, id) {
        var url = this.buildConnectionString(user, this._privatePrefix);
        return this.http.get(url + id)
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    DocumentService.prototype.createNote = function (note, user) {
        try {
            var headers = new http_1.Headers();
            headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
            headers.append("Content-Type", "application/json");
            var options = new http_1.RequestOptions({ headers: headers });
            var url = this.buildConnectionString(user, this._privatePrefix);
            return this.http.post(url, JSON.stringify(note), options)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
        }
        catch (error) {
            throw error;
        }
    };
    DocumentService.prototype.deleteNote = function (note, user) {
        try {
            var url = this.buildConnectionString(user, this._privatePrefix);
            return this.http.delete(url + note._id + '?rev=' + note._rev)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
        }
        catch (error) {
            console.log("There was an error deleting your document :( ");
        }
    };
    DocumentService.prototype.updateNote = function (data, user) {
        try {
            var headers = new http_1.Headers();
            headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
            headers.append("Content-Type", "application/x-www-form-urlencoded");
            var options = new http_1.RequestOptions({ headers: headers });
            var url = this.buildConnectionString(user, this._privatePrefix);
            return this.http.put(url + data._id, JSON.stringify(data), options)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
        }
        catch (error) {
            console.log("There was an error updating your document :( ");
        }
    };
    DocumentService.prototype.initializeDB = function (user) {
        var _this = this;
        try {
            this.createDB(this.buildConnectionString(user, this._privatePrefix)).then(function (sucess) { return _this.createDB(_this.buildConnectionString(user, _this._sharePrefix)); });
        }
        catch (error) {
            throw error;
        }
    };
    DocumentService.prototype.createDB = function (url) {
        var headers = new http_1.Headers();
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(url, JSON.stringify({}), options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    DocumentService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    DocumentService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Hey Couch db Server error';
        return Promise.reject(errMsg);
    };
    DocumentService.prototype.buildConnectionString = function (user, prefix) {
        var hashName = md5(user);
        var url = this._endPointUrl + prefix + hashName + '/';
        return url;
    };
    DocumentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DocumentService);
    return DocumentService;
}());
exports.DocumentService = DocumentService;
