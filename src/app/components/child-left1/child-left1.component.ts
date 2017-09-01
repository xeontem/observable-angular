import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-child-left1',
  templateUrl: './child-left1.component.html',
  styleUrls: ['./child-left1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildLeft1Component implements OnInit {
	
	title:string;
	allow:boolean = false;
	changed:string = '';
  
  constructor(private cd: ChangeDetectorRef) {
  	this.title = 'left';
  }

  changeTitle() {
  	this.allow = true;
  }

  ngOnInit() {
    this.cd.markForCheck();
  }

  ngDoCheck() {
  	if(this.allow) {
  		this.changed = 'changed';
  		setTimeout(()=>{this.changed = ''}, 1000);
  		this.allow = false;
  	}
  		// console.log('doCheck in left');
  }
}
