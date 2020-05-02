import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register3200Component } from './register3200.component';

describe('Register3200Component', () => {
  let component: Register3200Component;
  let fixture: ComponentFixture<Register3200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register3200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register3200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
