import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Role1200Component } from './role1200.component';

describe('Role1200Component', () => {
  let component: Role1200Component;
  let fixture: ComponentFixture<Role1200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Role1200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Role1200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
