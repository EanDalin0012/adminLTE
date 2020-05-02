import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register1100Component } from './register1100.component';

describe('Register1100Component', () => {
  let component: Register1100Component;
  let fixture: ComponentFixture<Register1100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register1100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register1100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
