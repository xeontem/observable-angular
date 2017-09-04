import { ViewChild, Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { interval as observableInterval } from 'rxjs/observable/interval';
import { Observable, Subscription } from 'rxjs';
// let Observable.bubbleSort: any;
const cond = x => t => f => x ? t : f;
const condL = x => tF => fF => x ? tF() : fF();
const swap = arr => i => j => [arr[i], arr[j]] = [arr[j], arr[i]];
const defineType = arr => i => cond(arr[i])(arr[i].type)({});

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

  tryFP() {
    // fixed points:
    // cond = 0 => 1 => 0 => 0
    // cond = 1 => 0 => 1 => 0
    // ----------------------------------------
    // Y(t) = fixed
    // cond(t) = t; // if t == true
    // cond(t) = f // if t == false
    // Y(cond) = t || f;
    // Y = F => F(Y(F));
    // Ycond = F => F(x => Ycond(F)(x));
    // const temp = Ycond(cond);
    // temp(true)
     const addFive = n => n+5;
     const addSix = n => n+6;
     const cond = x => t => f => {
      console.log(x); 
      return x ? t : f};
     const Ycond = F => F(x => Ycond(F)(x));
     const fls = Ycond(Ycond(cond));
     console.log(fls);
     
    //  const condAfter = x => t => f => x ? condC(t) : condC(f);
     const condC = Ycond(cond);
    //  const result = condAfter(1);
    //  const check = condF(5)(addFive)(addSix);// it works
    //  console.log(condC(3)(4));
  }

  secondTry() {
    const sFunc = x => f => {
      const res = f(x);
      return y => y(res);
    }
    const trsx = sFunc(3)(x => x+x)(x => x*x);
    const Ycond = F => F(x => Ycond(F)(x));
    const sum = Ycond(sFunc);
    const str = sum(x => x+x)(x => x+x);
    console.log(str)
  }
  
  sortByType() {
    this.sortByTypeStream$ = Observable.interval(5).take(this.events.length)
      .flatMap(i => Observable.from(this.events))
      .map((ev, j) => cond(j >= this.events.length)(j = j % this.events.length)(j))
      .map(j => condL(j < this.events.length-1)
        ((x => cond(defineType(this.events)(j) > defineType(this.events)(j+1))
          ({bool: true, j})
          ({bool: false, j})))
        ((x => ({bool: false, j}))))
      .map(o => condL(o.bool)(x => swap(this.events)(o.j)(o.j+1))(x => []))
      .subscribe(i => this.cd.markForCheck());
  }

  reverse() {
    this.reverseStream$ = observableInterval(5)
      .take(this.events.length/2)
      .map(i => ({i, j: cond(this.events.length-i-1 < 0)(0)(this.events.length-i-1)}))
      .map(o => swap(this.events)(o.i)(o.j))
      .subscribe(i => this.cd.markForCheck());
  }

  shake() {
    this.shakeStream$ = observableInterval(5).take(this.events.length/2)
    .map(i => ({i: ~~(Math.random() * this.events.length), j: ~~(Math.random() * this.events.length)}))
    .do(o => swap(this.events)(o.i)(o.j))
    .subscribe(a => this.cd.markForCheck())
  }

  ngOnInit() {

    this.containerClickStream$ = Observable.fromEvent(this.container.nativeElement, 'click')
      .pluck('path')
      .flatMap((path: any) => Observable.from(path))
      .filter((el: any) => el.classList)
      .filter((el: any) => el.classList.contains('event-container'))
      .pluck('id')
      .do((id:number) => this.selectedEvent = this.events[id])
      .subscribe(id => this.cd.markForCheck());

    this.button1ClickStream$ = Observable.fromEvent(this.button1.nativeElement, 'click')
      .do(i => this.calculateStream$.next([3, 4]))
      .subscribe(e => this.cd.markForCheck());

    this.button2ClickStream$ = Observable.fromEvent(this.button2.nativeElement, 'click')
      .switchMap(event => this.intervalStream$)
      .do(val => this.timer = val)
      .subscribe(val => this.cd.markForCheck());

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
      .map(events => this.events = events)
      .switchMap(events => Observable.from(events))
      .map((event, index) => this.tempArr.push(index))
      .switchMap(i => observableInterval(5).take(this.events.length))
      .map(i => ~~(Math.random() * this.tempArr.length))
      .do(r => this.events[this.tempArr[r]].visible = 'visible')
      .map(r => this.tempArr.splice(r, 1))
      .subscribe(i => this.cd.markForCheck())

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
