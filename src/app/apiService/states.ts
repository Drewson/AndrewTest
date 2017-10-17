import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

import { State } from '../models';

@Injectable()
export class StateAPIService {

    constructor(private http: Http){}

    getState(state){
      const headers = new Headers();
      headers.append( 'Content-Type', 'application/json' );
      return this.http.get(`http://services.groupkt.com/state/search/USA?text=${state}`)
        .map(this.extractData)      
        .catch(this.handleError);
            
    }

    private extractData(res:Response) {
      let body = res.json();
      return body || [];
    }

    private handleError(error:any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
  }
}