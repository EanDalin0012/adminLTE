import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register4100Component } from './register4100.component';

describe('Register4100Component', () => {
  let component: Register4100Component;
  let fixture: ComponentFixture<Register4100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register4100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register4100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
