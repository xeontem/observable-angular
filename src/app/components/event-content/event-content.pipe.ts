import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../../services/translate.service';

@Pipe({
  name: 'eventContent'
})
export class EventContentPipe implements PipeTransform {
  
  constructor(private translateService: TranslateService) {}

  transform(value: any, lang: string, text: string) {
    let direction:string = 'en-' + lang;
    return this.translateService.getTranslate(value, direction).distinctUntilChanged();
  }

}