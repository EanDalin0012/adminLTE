import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register6200Component } from './register6200.component';

describe('Register6200Component', () => {
  let component: Register6200Component;
  let fixture: ComponentFixture<Register6200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register6200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register6200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
