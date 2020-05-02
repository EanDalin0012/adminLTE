import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register2100Component } from './register2100.component';

describe('Register2100Component', () => {
  let component: Register2100Component;
  let fixture: ComponentFixture<Register2100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register2100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register2100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
