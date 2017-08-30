import { EventContentPipe } from './event-content.pipe';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
class FakeTranslateService {
  url: string;
  http: any;
  constructor() {}
  getTranslate(text, direction) { return Observable.from(text) }

}

describe('EventContentPipe', () => {
  it('create an instance', () => {
    const pipe = new EventContentPipe(new FakeTranslateService());
    expect(pipe).toBeTruthy();
  });
  it('should return observable and right value inside', () => {
    const pipe = new EventContentPipe(new FakeTranslateService());
    const testValue = 'example text';
    const observable = pipe.transform(testValue, '', '');
    observable.flatMap(val => expect(val).toEqual(testValue));
  });
});