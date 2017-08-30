import { ViewChild, Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { interval as observableInterval } from 'rxjs/observable/interval';
import { Observable, Subscription } from 'rxjs';
// let Observable.bubbleSort: any;

interface SelectedEvent {
  type: string,
  title?: string,
  description?: string,
  duration?: number,
  id?: string,
  location?: string,
  resources?: Array<any>,
  speakers?: Array<any>,
};
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy  {
  @ViewChild('btn1') button1: ElementRef;
  @ViewChild('btn2') button2: ElementRef;
  @ViewChild('btn3') button3: ElementRef;
  @ViewChild('evntCont') container: ElementRef;

  selectedEvent: SelectedEvent = {type: 'select event'};
  types: Array<string> = ['workshop', 'webinar', 'lecture', 'deadline', 'event'];
  result: number = 0;
  events: Array<any> = [];
  tempArr: Array<any> = [];
  scanedEvents: Array<any> = [];
  nextClass: string = '';
  timer: string;
  button1ClickStream$: Subscription;
  button2ClickStream$: Subscription;
  button3ClickStream$: Subscription;
  containerClickStream$: Subscription;
  shakeStream$: Subscription;
  sortByTypeStream$: Subscription;
  reverseStream$: Subscription;
  setVisibleStream$: Subscription;
  // sortStream$: Subscription;
  parsePathStream$: Subscription;
  testObj: {value: string};
  switch: boolean = false;

  intervalStream$ = observableInterval(1000)
    .map(val => `page loaded a ${val} seconds ago`); 

  // selectEventStream$ = new BehaviorSubject({type: 'select event'});
  calculateStream$ = new BehaviorSubject([0, 0]);
  changeClassStream$ = new BehaviorSubject('');
  sortStream$ = new BehaviorSubject(0);

  constructor(
    private eventsService: EventsService,
    private cd: ChangeDetectorRef,
    private elements: ElementRef) {
      this.testObj = {
        value: 'test value'
      }
    }

  private lazyEvaluate(x:number, y:number):number {
    let caclcSum = (a:number, b:number):number => a+b;
    let calcMult = (a:number, b:number):number => a*b;
    return calcMult(caclcSum(x, y), caclcSum(x, y));
  }

  changeProperty() {
    this.testObj.value = 'I changed this value just now';
  }
  makeSort(prop, type, i) {
    this.events.map((ev, j) => {
      if(j > i && ev[prop] == type && this.events[i][prop] != type) {
          let temp = JSON.parse(JSON.stringify(this.events[i]));
        this.events[i] = ev;
        this.events[j] = temp;
        this.cd.markForCheck();
        return;
      }
    });
  }

  sort() {
    // this.sortStream$
    Observable.interval(5).take(this.events.length)
      .map(i => this.sortStream$.next(i))
      
  }

  sortByType() {
    this.sortByTypeStream$ = Observable.interval(5).take(this.events.length)
      .subscribe(i => this.types.map(val => this.makeSort('type', val, i)));
  }

  reverse() {
    return new Promise((res, rej) => {
      this.reverseStream$ = observableInterval(5)
        .take(this.events.length/2)
        .map(i => [i, this.events.length-i-1 < 0 ? 0 : this.events.length-i-1])
        .map(i => [this.events[i[0]], this.events[i[1]]] = [this.events[i[1]], this.events[i[0]]])
        .subscribe(() => this.cd.markForCheck());
      res(this.events);
      });
  }

  shake() {
    this.shakeStream$ = observableInterval(5).take(this.events.length/2)
    .map(i => [~~(Math.random() * this.events.length), ~~(Math.random() * this.events.length)])
    .do(a => [this.events[a[0]], this.events[a[1]]] = [this.events[a[1]], this.events[a[0]]])
    .subscribe(a => this.cd.markForCheck())
  }

  ngOnInit() {

    this.containerClickStream$ = Observable.fromEvent(this.container.nativeElement, 'click')
      .pluck('path')
      .flatMap((path: any) => Observable.from(path))
      .filter((el: any) => el.classList)
      .filter((el: any) => el.classList.contains('event-container'))
      .pluck('id')
      .subscribe((id: number) => {
        this.selectedEvent = this.events[id];
        this.cd.markForCheck();
    });  
    this.button1ClickStream$ = Observable.fromEvent(this.button1.nativeElement, 'click')
      .subscribe(e => {
        this.calculateStream$.next([3, 4]);
        this.cd.markForCheck();
    });
    this.button2ClickStream$ = Observable.fromEvent(this.button2.nativeElement, 'click')
    .switchMap(event => {
      return this.intervalStream$})
      .subscribe(val => {
        this.timer = val;
        this.cd.markForCheck();
    });
    this.button3ClickStream$ = Observable.fromEvent(this.button3.nativeElement, 'click')
      .subscribe(e => {
        this.changeClassStream$.next('changed');
        setTimeout(()=>{this.changeClassStream$.next('')}, 1000);
        this.cd.markForCheck();
    });
    this.changeClassStream$.subscribe(name => {
      this.nextClass = name;
      this.cd.markForCheck();
    });
    
    this.eventsService.getEvents()
    .map(events => {
      this.events = events;
      return events})
    .switchMap(events => Observable.from(events))
    .map((event, index) => {
      this.tempArr.push(index);
      return event})
    .reduce((acc: Array<any>, event) => {
      acc.push(event);
      return acc}, [])
    .switchMap((events:Array<any>) => observableInterval(5).take(events.length))
    .subscribe(index => {
      let randomTempArrInd = parseInt((Math.random() * this.tempArr.length).toString());
      let randEventInd = this.tempArr[randomTempArrInd];
      this.events[randEventInd].visible = 'visible';
      this.tempArr.splice(randomTempArrInd, 1);
      this.cd.markForCheck();
    });

    this.calculateStream$.subscribe(numArr => {
      this.result = this.lazyEvaluate(numArr[0], numArr[1]);
      this.cd.markForCheck();
    });
  }


  ngDoCheck() {
  }

  ngOnDestroy() {
    // this.intervalStream$.unsubscribe();
    // this.selectEventStream$.unsubscribe();
    this.calculateStream$.unsubscribe();
  }
}
