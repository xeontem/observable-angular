import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildRight21Component } from './child-right21.component';

describe('ChildRight21Component', () => {
  let component: ChildRight21Component;
  let fixture: ComponentFixture<ChildRight21Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildRight21Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildRight21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
