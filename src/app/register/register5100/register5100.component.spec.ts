import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register5100Component } from './register5100.component';

describe('Register5100Component', () => {
  let component: Register5100Component;
  let fixture: ComponentFixture<Register5100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register5100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register5100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
