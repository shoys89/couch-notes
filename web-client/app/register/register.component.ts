import {Component, ElementRef} from '@angular/core';
import {AuthenticationService, User} from '../_services/auth.service';
import {DocumentService} from '../_services/document.service';
import {Router} from '@angular/router';

@Component({
     moduleId:module.id,
    selector: 'login-form',
    providers: [AuthenticationService, DocumentService],
    templateUrl: `register.component.html`
})

export class RegisterComponent {

    public email: string = "";
    public password: string = "";
    public password2: string;
    public errorMsg = '';

    constructor(
        private _authService: AuthenticationService, private _docService: DocumentService, private _router: Router) {
        console.log('home');
    }

    register() {
        if (this.password === this.password2) {
            let user = new User(this.email, this.password);
            console.log(user);
            this._authService.create(user)
                .then(
                sucess => {
                    this._docService.initializeDB(this.email);
                    this._router.navigate(['/login'])
                },
                error => this.errorMsg = 'There was an error creating this user');
        }
        else {
            alert("Passwords do not match");
        }

    }
}