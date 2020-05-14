import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRole1000Component } from './user-role1000.component';

describe('UserRole1000Component', () => {
  let component: UserRole1000Component;
  let fixture: ComponentFixture<UserRole1000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRole1000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRole1000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
