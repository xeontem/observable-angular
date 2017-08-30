import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildRight22Component } from './child-right22.component';

describe('ChildRight22Component', () => {
  let component: ChildRight22Component;
  let fixture: ComponentFixture<ChildRight22Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildRight22Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildRight22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
