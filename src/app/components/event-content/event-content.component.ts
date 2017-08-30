import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'event-content',
  templateUrl: './event-content.component.html',
  styleUrls: ['./event-content.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventContentComponent implements OnInit {
  @Input()event: {type: string, title: string};

  lang: string = 'en';
  langs: Array<{name: string, val: string}>;

  constructor() {
    this.langs = [
      {name: 'English', val: 'en'},
      {name: 'Russian', val: 'ru'},
      {name: 'Belarussian', val: 'be'},
      {name: 'Dutch', val: 'nl'},
      {name: 'French', val: 'fr'},
      {name: 'Japanese', val: 'ja'}
    ];
   }

  ngOnInit() {
    // console.dir(this.event);
  }

  ngDoCheck() {
    
  }

}