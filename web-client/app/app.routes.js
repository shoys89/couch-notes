"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var index_1 = require('./login/index');
var index_2 = require('./register/index');
var appRoutes = [
    { path: 'home', component: home_component_1.PrivateComponent },
    { path: 'login', component: index_1.LoginComponent },
    { path: 'signup', component: index_2.RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
