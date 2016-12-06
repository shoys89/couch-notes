import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http, Headers, RequestOptions, Response } from '@angular/http';

export class User {
  constructor(
    public email: string,
    public password: string) { }
}

@Injectable()
export class AuthenticationService {
  private _endPointUrl: string = "http://130.211.127.182:5984/_session";
  private _rootEndPointUrl: string = "http://admin:admin@130.211.127.182:5984/_users/org.couchdb.user:";

  constructor(
    private _router: Router, private http: Http) { }

  logout() {
    localStorage.removeItem("user");
  }

  login(user: any) {
    let body = JSON.stringify({ name: user.email, password: user.password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._endPointUrl, body, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  create(user: any) {
    let url = this._rootEndPointUrl + user.email;
    let body = JSON.stringify({ name: user.email, password: user.password, roles: [], type: 'user' });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(url, body, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  checkCredentials() {
    if (localStorage.getItem("user") === null) {
      return false;
    }
    return true;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Hey Couch db Server error';
    
    return Promise.reject(errMsg);
  }

  getCurrentUser() {
    let username = localStorage.getItem("user");
    return new User(username, 'Encrypted');
  }
}