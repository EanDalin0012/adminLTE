import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { User1200Component } from './user1200.component';

describe('User1200Component', () => {
  let component: User1200Component;
  let fixture: ComponentFixture<User1200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User1200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User1200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
