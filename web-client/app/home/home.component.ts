import {Component} from '@angular/core';
import {AuthenticationService, User} from '../_services/auth.service'
import {Router} from '@angular/router';
import {DocumentService} from '../_services/document.service';
import {Document} from '../_models/document';
import {Note} from '../_models/note';

@Component({
    selector: 'login-form',
    providers: [AuthenticationService, DocumentService],
    templateUrl: `./app/home/home.component.html`
})

export class PrivateComponent {
    private documents: Document[];
    private notes: Note[] = [];
    public selectedNote: Document = new Document();
    private user: User;

    constructor(
        private _service: AuthenticationService, private _router: Router, private service: DocumentService) {
    }

    ngOnInit() {
        if (!this._service.checkCredentials()) {
            this._router.navigate(['/login']);
        }
        else {
            this.user = this._service.getCurrentUser();
            this.service.getAllDocs(this.user.email).then(documents => this.getNotes(documents));
            console.log(this._service.getCurrentUser());
        }
    }

    logout() {
        this.user = new User('Not logged', '');
        this._service.logout();
    }

    getNotes(documents: any) {
        for (let doc of documents) {
            console.log(doc);
            this.service.getNoteById(this.user.email, doc.id).then(note => this.notes.push(note));
        }
    }

    selectNote(note: any) {
        this.selectedNote = note;
        console.log(note);
    }

    private getUsername() {
        this.user = this._service.getCurrentUser();
    }
}