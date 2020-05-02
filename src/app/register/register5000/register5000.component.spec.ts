import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register5000Component } from './register5000.component';

describe('Register5000Component', () => {
  let component: Register5000Component;
  let fixture: ComponentFixture<Register5000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register5000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register5000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
