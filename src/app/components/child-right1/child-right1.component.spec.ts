import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildRight1Component } from './child-right1.component';
import { ChildRight21Component } from '../child-right21/child-right21.component';
import { ChildRight22Component } from '../child-right22/child-right22.component';

describe('ChildRight1Component', () => {
  let component: ChildRight1Component;
  let fixture: ComponentFixture<ChildRight1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildRight1Component, ChildRight21Component, ChildRight22Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildRight1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
