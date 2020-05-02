import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register7000Component } from './register7000.component';

describe('Register7000Component', () => {
  let component: Register7000Component;
  let fixture: ComponentFixture<Register7000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register7000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register7000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
