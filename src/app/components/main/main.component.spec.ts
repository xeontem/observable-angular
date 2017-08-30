import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Http } from '@angular/http';

import { MainComponent } from './main.component';
import { ChildLeft1Component } from '../child-left1/child-left1.component';
import { ChildRight1Component } from '../child-right1/child-right1.component';
import { EventsService } from '../../services/events.service';
import { Observable } from 'rxjs';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let eventsService: any;
  let spy: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpModule], 
      declarations: [ MainComponent, ChildLeft1Component, ChildRight1Component ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [EventsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    eventsService = fixture.debugElement.injector.get(EventsService);
    spy = spyOn(eventsService, 'getEvents')
      .and.returnValue(Observable.of([{type: 'workshop', title: 'er'}, {type: 'event', title: 'er'}, {type: 'deadline', title: 'er'}]));
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('changeProperty should change a property', () => {
    expect(component.testObj.value).toEqual('test value');
    component.changeProperty();
    expect(component.testObj.value).toEqual('I changed this value just now');
  });
  it('should store events resieved from servise', () => {
    component.ngOnInit();
    component.reverse().then(e => {
      console.log(component.events);
      console.log(component.events[0]);
      console.log(component.events[1]);
      console.log(component.events[2]);
      console.log(component.events);
      expect(component.events[0].type).toEqual('workshop');
    });
    // fixture.detectChanges();
  });
});
