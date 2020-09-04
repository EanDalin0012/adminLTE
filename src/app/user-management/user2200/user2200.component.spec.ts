import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { User2200Component } from './user2200.component';

describe('User2200Component', () => {
  let component: User2200Component;
  let fixture: ComponentFixture<User2200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User2200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User2200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
