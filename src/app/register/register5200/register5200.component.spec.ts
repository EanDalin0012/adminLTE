import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register5200Component } from './register5200.component';

describe('Register5200Component', () => {
  let component: Register5200Component;
  let fixture: ComponentFixture<Register5200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register5200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register5200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
