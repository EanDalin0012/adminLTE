import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { User1000Component } from './user1000.component';

describe('User1000Component', () => {
  let component: User1000Component;
  let fixture: ComponentFixture<User1000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User1000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User1000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
