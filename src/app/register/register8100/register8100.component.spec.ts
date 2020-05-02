import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register8100Component } from './register8100.component';

describe('Register8100Component', () => {
  let component: Register8100Component;
  let fixture: ComponentFixture<Register8100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register8100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register8100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
