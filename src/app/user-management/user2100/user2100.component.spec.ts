import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { User2100Component } from './user2100.component';

describe('User2100Component', () => {
  let component: User2100Component;
  let fixture: ComponentFixture<User2100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User2100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User2100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
