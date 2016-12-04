import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { Document } from '../_models/document';
import { Note } from '../_models/note';
declare var md5: any;

@Injectable()
export class DocumentService {
    private _endPointUrl: string = "http://130.211.127.182:5984/";
    private _rootEndPointUrl: string = "http://admin:admin@130.211.127.182:5984/";
    private http: Http;
    private _sharePrefix: string = "share_";
    private _privatePrefix: string = "personal_";

    constructor(http: Http) {
        this.http = http;
    }

    getAllDocs(user: string): Promise<Document[]> {
        let url = this.buildConnectionString(user,this._privatePrefix);
        return this.http.get(url + '_all_docs')
            .toPromise()
            .then(response => response.json().rows as Document[])
    }

    getNoteById(user: string, id: string): Promise<Note> {
        let url = this.buildConnectionString(user,this._privatePrefix);
        return this.http.get(url + id)
            .toPromise()
            .then(response => response.json() as Note)
    }

    createNote(note: any, user: string) {
        try {
            let headers: any = new Headers();
            headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
            headers.append("Content-Type", "application/json");
            let options = new RequestOptions({ headers: headers });
            let url = this.buildConnectionString(user,this._privatePrefix);

            return this.http.post(url, JSON.stringify(note), options)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);

        } catch (error) {
            throw error;
        }
    }

    deleteNote(note: any, user: string){
        try {
            let url = this.buildConnectionString(user,this._privatePrefix);
            
            return this.http.delete(url+note._id+'?rev='+note._rev)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);
        } catch (error) {
            console.log("There was an error deleting your document :( ");
        }
    }

    updateNote(data: any, user: string) {
        try {
            let headers: any = new Headers();
            headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
            headers.append("Content-Type", "application/x-www-form-urlencoded");
            let options = new RequestOptions({ headers: headers });

            let url = this.buildConnectionString(user,this._privatePrefix);

            return this.http.put(url+ data._id, JSON.stringify(data), options)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleError);

        } catch (error) {
            console.log("There was an error updating your document :( ");
        }
    }

    initializeDB(user: string) {
        try {
            this.createDB(this.buildConnectionString(user,this._privatePrefix)).then(
                sucess => this.createDB(this.buildConnectionString(user,this._sharePrefix)));
        } catch (error) {
            throw error;
        }
    }

    createDB(url: string) {
        let headers: any = new Headers();
        headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        let options = new RequestOptions({ headers: headers });

        return this.http.put(url, JSON.stringify({}), options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Hey Couch db Server error';
        return Promise.reject(errMsg);
    }

    private buildConnectionString(user: string, prefix:string) {
        let hashName = md5(user);
        let url = this._endPointUrl + prefix + hashName + '/';
        return url;
    }

}