import {Component, ElementRef} from '@angular/core';
import {AuthenticationService, User} from '../_services/auth.service';
import {Router} from '@angular/router';

@Component({
     moduleId:module.id,
    selector: 'login-form',
    providers: [AuthenticationService],
    templateUrl: `login.component.html`
})

export class LoginComponent {

    public user = new User('', '');
    public errorMsg = '';
    private error:boolean = false;
    
    constructor(
        private _service: AuthenticationService, private _router: Router) {
        console.log('home');
    }

    login() {
        this._service.login(this.user)
            .then(
            sucess => { localStorage.setItem("user", sucess.name); this._router.navigate(['/home']) },
            error => {this.errorMsg = 'Failed to login'; this.error=true;});
    }
}