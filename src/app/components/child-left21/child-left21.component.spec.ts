import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildLeft21Component } from './child-left21.component';

describe('ChildLeft21Component', () => {
  let component: ChildLeft21Component;
  let fixture: ComponentFixture<ChildLeft21Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildLeft21Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildLeft21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
