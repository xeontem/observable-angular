import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildLeft1Component } from './child-left1.component';
import { ChildLeft21Component } from '../child-left21/child-left21.component';
import { ChildLeft22Component } from '../child-left22/child-left22.component';

describe('ChildLeft1Component', () => {
  let component: ChildLeft1Component;
  let fixture: ComponentFixture<ChildLeft1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildLeft1Component, ChildLeft21Component, ChildLeft22Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildLeft1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
