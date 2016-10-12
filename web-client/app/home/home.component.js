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
var router_1 = require('@angular/router');
var document_service_1 = require('../_services/document.service');
var document_1 = require('../_models/document');
var PrivateComponent = (function () {
    function PrivateComponent(_service, _router, service) {
        this._service = _service;
        this._router = _router;
        this.service = service;
        this.notes = [];
        this.selectedNote = new document_1.Document();
    }
    PrivateComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this._service.checkCredentials()) {
            this._router.navigate(['/login']);
        }
        else {
            this.user = this._service.getCurrentUser();
            this.service.getAllDocs(this.user.email).then(function (documents) { return _this.getNotes(documents); });
            console.log(this._service.getCurrentUser());
        }
    };
    PrivateComponent.prototype.logout = function () {
        this.user = new auth_service_1.User('Not logged', '');
        this._service.logout();
    };
    PrivateComponent.prototype.getNotes = function (documents) {
        var _this = this;
        for (var _i = 0, documents_1 = documents; _i < documents_1.length; _i++) {
            var doc = documents_1[_i];
            console.log(doc);
            this.service.getNoteById(this.user.email, doc.id).then(function (note) { return _this.notes.push(note); });
        }
    };
    PrivateComponent.prototype.selectNote = function (note) {
        this.selectedNote = note;
        console.log(note);
    };
    PrivateComponent.prototype.create = function (note) {
        if ("undefined" === typeof (note.user)) {
            note.user = this.user.email;
        }
        if (note) {
            this.service.createNote(note, this.user.email).then(function (success) { return (location.reload()); }, function (error) { return ((alert("Need to catch this error in a better way" + error))); });
        }
    };
    PrivateComponent.prototype.update = function (note) {
        console.log(note);
        this.service.updateNote(note, this.user.email).then(function (sucess) { return (alert('document updated')); }, function (error) { return ((alert("Need to catch this error in a better way" + error))); });
    };
    PrivateComponent.prototype.getUsername = function () {
        this.user = this._service.getCurrentUser();
    };
    PrivateComponent = __decorate([
        core_1.Component({
            selector: 'login-form',
            providers: [auth_service_1.AuthenticationService, document_service_1.DocumentService],
            templateUrl: "./app/home/home.component.html"
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthenticationService, router_1.Router, document_service_1.DocumentService])
    ], PrivateComponent);
    return PrivateComponent;
}());
exports.PrivateComponent = PrivateComponent;
