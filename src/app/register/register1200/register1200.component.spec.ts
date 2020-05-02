import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register1200Component } from './register1200.component';

describe('Register1200Component', () => {
  let component: Register1200Component;
  let fixture: ComponentFixture<Register1200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register1200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register1200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
