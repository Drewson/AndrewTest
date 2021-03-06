import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

@Injectable()
export class StateAPIService {

    constructor(private http: Http) { }

    getState(state) {
      return this.http.get(`http://services.groupkt.com/state/search/USA?text=${state}`)
        .map(this.extractData)
        .catch(this.handleError);
    }

    private extractData(res: Response) {
      const body = res.json();
      return body || [];
    }

    private handleError(error: any) {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
  }
}
