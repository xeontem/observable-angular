import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-left22',
  templateUrl: './child-left22.component.html',
  styleUrls: ['./child-left22.component.css']
})
export class ChildLeft22Component implements OnInit {
	
  title:string;
  allow:boolean = false;
  changed:string = '';

  constructor() {
  	this.title = 'right';
  }

  changeTitle() {
    this.allow = true;
  }

  ngOnInit() {
  }

  ngDoCheck() {
  	if(this.allow) {
  		this.changed = 'changed';
  		setTimeout(()=>{this.changed = ''}, 1000);
  		this.allow = false;
    }
  	  // console.log('doCheck in left right');
  }
}
