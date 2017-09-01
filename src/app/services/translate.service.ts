import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TranslateService {
  url:string;
  
  constructor(public http:Http) {
    this.url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170821T101537Z.e13069e8f91b8da4.174b7a7ef315d6893cbb86dc9b61352e9f702a73';
    // console.log('translate service connected');
  }
  
  getTranslate(text: string, direction: string):any {
    return this.http.get(this.url+'&text='+text+'&lang='+direction)
      .map(res => res.json())
      .pluck('text')
      .pluck('0');
  }
}


