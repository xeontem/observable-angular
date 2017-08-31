import { ViewChild, Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';

@Component({
  selector: 'y-combinator',
  templateUrl: './y.component.html',
  styleUrls: ['./y.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YComponent implements OnInit {
  perfWith:number;
  perfWithout:number;
  withValue:number;
  withoutValue:number;
  
  constructor(private cd: ChangeDetectorRef) { }

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

  }
  
  moveY(e) {
    console.log('mouse down');
    // le
    e.preventDefault();
    e.path.map(el => {
      if(el.classList && el.classList.contains('y-combinator')) {
        console.log(`mouse: ${e.clientX}, ${e.clientY}`);
        el.style.left = `${e.clientX}px`;
        el.style.bottom = `${e.clientY-20}px`;
        let body = [document.body.clientWidth, document.body.clientHeight];
        console.log(body);
        
        
        // el.style.bottom = 
      }
    })
    
  }

  stopMoveY(e) {
    // console.log(e);
    
    // e.target.onmousedown = null;
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
