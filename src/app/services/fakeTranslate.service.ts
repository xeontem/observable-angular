import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TranslateService {
  constructor() {}
  getTranslate(text: string, direction: string):any {
    return Observable.from(text);
  }
}
