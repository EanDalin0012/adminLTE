import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register6100Component } from './register6100.component';

describe('Register6100Component', () => {
  let component: Register6100Component;
  let fixture: ComponentFixture<Register6100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register6100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register6100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
