import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register2200Component } from './register2200.component';

describe('Register2200Component', () => {
  let component: Register2200Component;
  let fixture: ComponentFixture<Register2200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register2200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register2200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
