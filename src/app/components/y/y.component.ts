import { ViewChild, Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'y-combinator',
  templateUrl: './y.component.html',
  styleUrls: ['./y.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YComponent implements OnInit {
  @ViewChild('comb') comb: ElementRef;

  perfWith:number;
  perfWithout:number;
  withValue:number;
  withoutValue:number;
  dragstartStream$: Subscription;
  dragenterStream$: Subscription;
  dragoverStream$: Subscription;
  dragleaveStream$: Subscription;
  dropStream$: Subscription;
  dragendStream$: Subscription;
  clickStream$: Subscription;
  bodyoverStream$: Subscription;
  initLayerX: number;
  initLayerY: number;
  cookies: {top?:string, left?:string} = {};

  constructor(private cd: ChangeDetectorRef, private elements: ElementRef) { }

  ngOnInit() {
    // identity:: a -> a
    const identity = x => x; // return arg
    // application - B-reduction
    const apply = f => x => f(x);// apply f -> x
    const constant = x => y => x;// skip y
    const compose = f => g => x => f(g(x));// apply g -> x && f -> g
    const flip = f => x => y => f(y)(x);// reverse input parameters. At first apply f to second arg, then to first. In result return flipped value;
    // S - combinator
    const S = f => x => z => f(z)(x(z));// like apply, but at first apply every arg to param "z": f(x) -> f(z)(x(z));
    // Y - combinator
    const Y = f => f(x => Y(f)(x));// find fixed point of f; Y = f => f(Y(f));
    // Z - combinator
    const Z = null;// ???
    // if
    const cond = x => t => f => x ? t : f;
    // ------------------------------ define element ------------------------------
    const el = this.comb.nativeElement;

    //--------------------------------- check cookies for coords ---------------------
    document.cookie.split('; ').map(cookie => {
      let eq = cookie.indexOf('=');
      let key = cookie.slice(0, eq);
      let value = cookie.slice(eq+1);
      this.cookies[key] = value;
    })

    //-------------------------------- set position --------------------------
    el.style.top = `${document.documentElement.offsetHeight - 400}px`;// default
    el.style.left = `${20}px`;// default
    if(this.cookies.top) el.style.top = this.cookies.top;
    if(this.cookies.left) el.style.left = this.cookies.left;

    //------------------------------- handle drag -----------------------------------
    this.dragstartStream$ = Observable.fromEvent(el, 'dragstart')
      .subscribe(e => this.handleDragStart(e, el));
    this.dragenterStream$ = Observable.fromEvent(el, 'dragenter')
      .subscribe(e => this.handleDragEnter(e, el));
    this.dragoverStream$ = Observable.fromEvent(el, 'dragover')
      .subscribe(e => this.handleDragOver(e, el));
    this.dragleaveStream$ = Observable.fromEvent(el, 'dragleave')
      .subscribe(e => this.handleDragLeave(e, el));
    this.dragendStream$ = Observable.fromEvent(el, 'dragend')
      .subscribe(e => this.handleDragEnd(e, el));
    this.dropStream$ = Observable.fromEvent(el, 'drop')
      .subscribe(e => this.handleDrop(e, el), err => console.dir(err));

    this.bodyoverStream$ = Observable.fromEvent(document.body, 'dragover')
      .subscribe(e => this.handledragoverBody(e))
  }
  
  handledragoverBody(e) {
    // e.dataTransfer.dropEffect = 'move';
  }

  handleDragStart(e, el) {
    
    this.initLayerX = e.layerX;
    this.initLayerY = e.layerY; 
    el.style.opacity = '0.4';
  }

  handleDragEnter(e, el) {
    el.classList.add('drag-over');
  }

  handleDragOver(e, el) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
    return false;
  } 
  
  handleDragLeave(e, el) {
    el.classList.remove('drag-over');  // this / e.target is previous target element.
  }
  
  handleDrop(e, el) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    return false;
  }
  
  handleDragEnd(e, el) {
    //------------------------ apply pos to elem ---------------------------
    el.style.opacity = '1';
    el.style.top = `${e.pageY - this.initLayerY - 20}px`;// 20 - padding
    el.style.left = `${e.pageX - this.initLayerX - 10}px`;// 10 - padding
    el.classList.remove('drag-over');
    //------------------------ store pos into cookies ----------------------
    let expire = new Date(new Date().getTime() + 60 * 1000).toUTCString();// set expire date
    document.cookie = `top=${el.style.top}; path=/; expires=${expire}`;
    document.cookie = `left=${el.style.left}; path=/; expires=${expire}`;
  }

  withYcombinator() {
    // const fib = n => {
    //   return (n === 0 || n === 1) ? 1 : fib(n - 1) + fib(n - 2);
    // };
    const fibF = f => n => {
      return (n === 0 || n === 1) ? 1 : f(n - 1) + f(n - 2);
    };
    // fixed points
    // f(x) = x * x;
    // f(0) = 0;
    // f(1) = 1;
    
    // Y(f) = fixed; - take func and find her fixed point;
    // fibF(f) = f; - fixed point for fibF;
    // Y(fibF) = f; Y-combinator for fibF should return f (f - fixed point of fibF);
    
    // Y(F) = f; F(f) = f;
    // Y(F) = F(f) => Y(F) = F(Y(F)); - recursion
    // const Y = F => F(Y(F)); - not working due to recursion;
    // const Y = F => F(x => Y(F)(x)); - done. no more recursion;
    // const fib = Y(fibF);
    let value:number;
    const perf = f => x => {
      const start = performance.now();
      value = f(x);
      return performance.now() - start;
    };
    // memoize
    const Ymem = memory => F => {
      return F(x => {
        if(memory.has(x)) return memory.get(x);
        const value = Ymem(memory)(F)(x);
        memory.set(x, value);
        return value;
      });
    };
    const fibMem = Ymem(new Map())(fibF);
    this.perfWith = Number(perf(fibMem)(40).toFixed(5));
    this.withValue = value;
    this.cd.markForCheck();
  }

  withoutYcombinator() {
    let value:number;
    const perf = f => x => {
      const start = performance.now();
      value = f(x);
      return performance.now() - start;
    };
    const fibF = n => {
      return (n === 0 || n === 1) ? 1 : fibF(n - 1) + fibF(n - 2);
    };
    console.log(value);
    
    this.perfWithout = Number(perf(fibF)(40).toFixed(5));
    this.withoutValue = value;
    this.cd.markForCheck();
  }
}
