import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EventContentComponent } from './event-content.component';
import { EventContentPipe } from './event-content.pipe';

// import { TranslateService } from '../../services/fakeTranslate.service';
import { TranslateService } from '../../services/translate.service';

// describe('EventContentComponent', () => {
//   let component: EventContentComponent;
//   let fixture: ComponentFixture<EventContentComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ EventContentComponent, EventContentPipe ],
//       imports: [FormsModule, HttpModule],
//       providers: [TranslateService]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(EventContentComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should be created', () => {
//     expect(component).toBeTruthy();
//   });
// });
