import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register4200Component } from './register4200.component';

describe('Register4200Component', () => {
  let component: Register4200Component;
  let fixture: ComponentFixture<Register4200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register4200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register4200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
