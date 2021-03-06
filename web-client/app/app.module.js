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
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var app_routes_1 = require('./app.routes');
var index_1 = require('./home/index');
var index_2 = require('./login/index');
var index_3 = require('./register/index');
var auth_service_1 = require('./_services/auth.service');
var truncate_pipe_1 = require('./_pipes/truncate.pipe');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, app_routes_1.routing],
            declarations: [app_component_1.AppComponent, index_1.PrivateComponent, index_2.LoginComponent, index_3.RegisterComponent, truncate_pipe_1.TruncatePipe],
            bootstrap: [app_component_1.AppComponent],
            providers: [auth_service_1.AuthenticationService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
