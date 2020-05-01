import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Sign1000Component } from './sign1000.component';

describe('Sign1000Component', () => {
  let component: Sign1000Component;
  let fixture: ComponentFixture<Sign1000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Sign1000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Sign1000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
