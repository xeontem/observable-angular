import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildLeft22Component } from './child-left22.component';

describe('ChildLeft22Component', () => {
  let component: ChildLeft22Component;
  let fixture: ComponentFixture<ChildLeft22Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildLeft22Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildLeft22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
