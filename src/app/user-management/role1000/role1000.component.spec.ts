import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Role1000Component } from './role1000.component';

describe('Role1000Component', () => {
  let component: Role1000Component;
  let fixture: ComponentFixture<Role1000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Role1000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Role1000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
