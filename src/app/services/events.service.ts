import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class EventsService {

  constructor(public http:Http) {
    // console.log('events service connected');
   }

  getEvents() {
    return this.http.get('https://damp-earth-84904.herokuapp.com/events')
      .map(res => res.json());
  }
}