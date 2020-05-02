import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register7100Component } from './register7100.component';

describe('Register7100Component', () => {
  let component: Register7100Component;
  let fixture: ComponentFixture<Register7100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register7100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register7100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
