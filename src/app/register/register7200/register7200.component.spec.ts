import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register7200Component } from './register7200.component';

describe('Register7200Component', () => {
  let component: Register7200Component;
  let fixture: ComponentFixture<Register7200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register7200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register7200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
