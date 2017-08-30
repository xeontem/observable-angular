import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-right21',
  templateUrl: './child-right21.component.html',
  styleUrls: ['./child-right21.component.css']
})
export class ChildRight21Component implements OnInit {

	title:string;
  allow:boolean = false;
  changed:string = '';

  constructor() {
  	this.title = 'left';
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
		  console.log('doCheck in right left');
  }

}
