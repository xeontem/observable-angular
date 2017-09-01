import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-child-left21',
  templateUrl: './child-left21.component.html',
  styleUrls: ['./child-left21.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChildLeft21Component implements OnInit {

  anyErrors: boolean;
	title:string = 'left';
	allow:boolean = true;
  nextClass: string = '';
  classStream$ = new BehaviorSubject('');
  togglerStream$ = new BehaviorSubject(true);

  constructor(private cd: ChangeDetectorRef) {

  }
  
  blink() {
    this.classStream$.next('changed');
    setTimeout(()=>{this.classStream$.next('')}, 1000);
  }

  toggleBlinks() {
    this.togglerStream$.next(!this.allow);
  }

  ngOnInit() {
    this.classStream$.subscribe(name => {
      this.nextClass = name;
      this.cd.markForCheck();
    });
    
    this.togglerStream$.subscribe(bool => {
      this.allow = bool;
      if(bool) this.cd.reattach();
      else this.cd.detach();
    });     
  }
  
  ngOnChanges() {
  	// console.log('onChanges');
  }

  ngDoCheck() {
  	// console.log('doCheck in left left');
  }
}
