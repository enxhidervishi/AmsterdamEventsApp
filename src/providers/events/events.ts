import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class EventsProvider {

  constructor(public http: HttpClient) {
  }

  getEvents() {
    return this.http.get("https://tsh-app.firebaseio.com/events.json");
  }
}
