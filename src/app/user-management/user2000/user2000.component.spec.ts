import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { User2000Component } from './user2000.component';

describe('User2000Component', () => {
  let component: User2000Component;
  let fixture: ComponentFixture<User2000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User2000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User2000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
