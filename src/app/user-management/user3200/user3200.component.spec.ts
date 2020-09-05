import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { User3200Component } from './user3200.component';

describe('User3200Component', () => {
  let component: User3200Component;
  let fixture: ComponentFixture<User3200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User3200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User3200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
