import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register3100Component } from './register3100.component';

describe('Register3100Component', () => {
  let component: Register3100Component;
  let fixture: ComponentFixture<Register3100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register3100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register3100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
