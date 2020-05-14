import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Role1100Component } from './role1100.component';

describe('Role1100Component', () => {
  let component: Role1100Component;
  let fixture: ComponentFixture<Role1100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Role1100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Role1100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
