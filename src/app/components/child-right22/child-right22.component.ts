import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-right22',
  templateUrl: './child-right22.component.html',
  styleUrls: ['./child-right22.component.css']
})
export class ChildRight22Component implements OnInit {
	
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
  	  console.log('doCheck in right right');
  }

}
