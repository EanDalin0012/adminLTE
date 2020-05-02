import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register8200Component } from './register8200.component';

describe('Register8200Component', () => {
  let component: Register8200Component;
  let fixture: ComponentFixture<Register8200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register8200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register8200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
