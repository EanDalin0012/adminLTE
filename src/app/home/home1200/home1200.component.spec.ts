import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Home1200Component } from './home1200.component';

describe('Home1200Component', () => {
  let component: Home1200Component;
  let fixture: ComponentFixture<Home1200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home1200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home1200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
