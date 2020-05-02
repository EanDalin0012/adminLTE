import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Register6000Component } from './register6000.component';

describe('Register6000Component', () => {
  let component: Register6000Component;
  let fixture: ComponentFixture<Register6000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Register6000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Register6000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
