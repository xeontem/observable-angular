import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	name:string;
	age:number;
	email:string;
	adress:Adress;
	hobbies:string[];
	hello:any;
	posts:Post[];
	isedit:boolean = false;

  constructor(private dataService:DataService) { }

  ngOnInit() {
	  this.name = 'Artsiom Kukharev';
	  this.age = 28;
	  this.email = 'xeontem@gmail.com';
	  this.adress = {
	  	street: "nezavisimosty",
	  	city: "Minsk",
	  	state: "M"
	  }
	  this.hobbies = ['write code', 'playing guitar'];
	  this.dataService.getPosts().subscribe(posts => {
	  	// console.log(posts);
	  	this.posts = posts.slice(0, 10);
	  });
  }

  onClick() {
  	this.name = "changed name";
  	this.hobbies.push('new hobby');
  }

  addHobby(hobby) {
  	console.log(hobby);
  	this.hobbies.unshift(hobby);
  	return false;
  }

  removeHobby(index) {
  	this.hobbies.map((hobby, i) => {
  		if(i == index) this.hobbies.splice(i, 1);
  	});
  }

  toggleEdit() {
  	this.isedit = !this.isedit;
  }

}

interface Adress{
	street:string,
	city:string,
	state:string
}

interface Post{
	id:number,
	title:string,
	body:string,
	userId:number
}