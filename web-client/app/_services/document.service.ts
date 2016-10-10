import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import {Document} from '../_models/document';
import {Note} from '../_models/note';
declare var md5: any;

@Injectable()
export class DocumentService {
    private _endPointUrl:string = "http://104.197.22.134:5984/";
    private _rootEndPointUrl:string = "http://admin:admin@104.197.22.134:5984/";
    private http:Http;
    private _sharePrefix:string = "share_";
    private _privatePrefix:string = "personal_";
    
    constructor(http: Http){
       this.http = http;
   }

   getAllDocs(user:string): Promise<Document[]> {
    let hashName = md5(user);
    return this.http.get(this._endPointUrl+this._privatePrefix+hashName+'/_all_docs')
               .toPromise()
               .then(response => response.json().rows as Document[])
  }

  getNoteById(user:string,id:string): Promise<Note>{
      let hashName = md5(user);
      return this.http.get(this._endPointUrl+this._privatePrefix+hashName+'/'+id)
               .toPromise()
               .then(response => response.json() as Note)
  }

  initializeDB(user:string){
      try {
          let hashName = md5(user);
          this.createDB(this._privatePrefix+hashName).then(
                     sucess  => this.createDB(this._sharePrefix+hashName));   
      } catch (error) {
          throw error;
      }
  }

  createDB(dbname:string){
      let url = this._rootEndPointUrl + dbname;
      let headers:any = new Headers();
     headers.append('Authorization','Basic YWRtaW46YWRtaW4=');
     headers.append("Content-Type", "application/x-www-form-urlencoded");
    let options = new RequestOptions({ headers: headers });

      return this.http.put(this._rootEndPointUrl + dbname, JSON.stringify({}),options)
             .toPromise()
             .then(this.extractData)
             .catch(this.handleError);
  }

private extractData(res: Response) {
  let body = res.json();
  return body || { };
} 

private handleError (error: any) {
  // In a real world app, we might use a remote logging infrastructure
  // We'd also dig deeper into the error to get a better message
  let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Hey Couch db Server error';
  console.error(errMsg); // log to console instead
  //return Promise.reject(errMsg);
} 

}