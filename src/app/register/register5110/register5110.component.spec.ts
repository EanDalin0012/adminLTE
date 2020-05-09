import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register5110Component } from './register5110.component';

describe('Register5110Component', () => {
  let component: Register5110Component;
  let fixture: ComponentFixture<Register5110Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register5110Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register5110Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
