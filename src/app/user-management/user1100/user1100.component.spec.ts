import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { User1100Component } from './user1100.component';

describe('User1100Component', () => {
  let component: User1100Component;
  let fixture: ComponentFixture<User1100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User1100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User1100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
