import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { User3000Component } from './user3000.component';

describe('User3000Component', () => {
  let component: User3000Component;
  let fixture: ComponentFixture<User3000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User3000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User3000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
