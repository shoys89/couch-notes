import { Component } from '@angular/core';
import { AuthenticationService, User } from '../_services/auth.service'
import { Router } from '@angular/router';
import { DocumentService } from '../_services/document.service';
import { Document } from '../_models/document';
import { Note } from '../_models/note';

@Component({
    moduleId:module.id,
    selector: 'login-form',
    providers: [AuthenticationService, DocumentService],
    templateUrl: `home.component.html`
})

export class PrivateComponent {
    private documents: Document[];
    private notes: Note[] = [];
    public newNote: Document = new Document();
    public selectedNote: Note = new Note();
    public title: string = "";
    private user: User;
    private onSuccess: boolean = false;
    private onError: boolean = false;
    private alertMsg: string = "";

    constructor(
        private _service: AuthenticationService, private _router: Router, private service: DocumentService) {
    }

    ngOnInit() {
        if (!this._service.checkCredentials()) {
            this._router.navigate(['/login']);
        }
        else {
            this.user = this._service.getCurrentUser();
            this.service.getAllDocs(this.user.email).then(documents => { this.getNotes(this.documents = documents) });
            console.log(this._service.getCurrentUser());
        }
    }

    logout() {
        this.user = new User('Not logged', '');
        this._service.logout();
        this._router.navigate(['/login']);
    }

    getNotes(documents: any) {
        for (let doc of documents) {
            this.service.getNoteById(this.user.email, doc.id).then(note => this.notes.push(note));
        }
    }

    selectNote(note: Note) {
        this.selectedNote = note;
        this.title = this.selectedNote.body;
    }

    create(note: any) {
        if ("undefined" === typeof (note.user)) {
            note.user = this.user.email;
        }
        if (note) {
            this.service.createNote(note, this.user.email).then(
                success => {
                    (this.service.getNoteById(this.user.email, success.id).then(note => this.notes.push(note)));
                    this.onSuccess = true;
                    this.alertMsg = "Your note has been created!";
                },
                error => {
                    this.onError = true;
                    this.alertMsg = error;
                })
        }
    }

    delete(note: any) {
        console.log(note);
        if (note) {
            this.service.deleteNote(note, this.user.email).then(
                success => {
                    let i = this.notes.indexOf(note);
                    if (i != -1) {
                        this.notes.splice(i, 1);
                    }
                    this.onSuccess = true;
                    this.alertMsg = "Your note has been deleted!";
                    (<any>$('#text-editor')).modal('hide');
                },
                error => {
                    this.onError = true;
                    this.alertMsg = error;
                })
        }
    }

    update(note: any) {
        console.log(note);
        this.service.updateNote(note, this.user.email).then(
            sucess => {
                this.onSuccess = true;
                this.alertMsg = "Your note has been updated!";
                (<any>$('#text-editor')).modal('hide');
            },
            error => {
                this.onError = true;
                this.alertMsg = error;
            }
        );
    }

    private getUsername() {
        this.user = this._service.getCurrentUser();
    }
}