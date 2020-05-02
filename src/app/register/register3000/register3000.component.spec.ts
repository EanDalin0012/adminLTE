import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register3000Component } from './register3000.component';

describe('Register3000Component', () => {
  let component: Register3000Component;
  let fixture: ComponentFixture<Register3000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register3000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register3000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
