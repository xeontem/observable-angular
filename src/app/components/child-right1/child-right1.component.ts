import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-child-right1',
  templateUrl: './child-right1.component.html',
  styleUrls: ['./child-right1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildRight1Component implements OnInit {
	
  title:string;
  allow:boolean = false;
  changed:string = '';

  constructor(private cd: ChangeDetectorRef) {
  	this.title = 'right';
  }

  changeTitle() {
    this.allow = true;
  }
  


  ngOnInit() {
    // this.cd.markForCheck();
  }

  ngDoCheck() {
  	if(this.allow) {
  		this.changed = 'changed';
  		setTimeout(()=>{this.changed = ''}, 1000);
  		this.allow = false;
    }
  	  // console.log('doCheck in right');
  }

}
