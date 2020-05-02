import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register8000Component } from './register8000.component';

describe('Register8000Component', () => {
  let component: Register8000Component;
  let fixture: ComponentFixture<Register8000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register8000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register8000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
