import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Home1100Component } from './home1100.component';

describe('Home1100Component', () => {
  let component: Home1100Component;
  let fixture: ComponentFixture<Home1100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home1100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home1100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
