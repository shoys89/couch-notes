import { Routes, RouterModule } from '@angular/router';

import { PrivateComponent } from './home/home.component';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
const appRoutes: Routes = [
    { path: 'home', component: PrivateComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component:RegisterComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);