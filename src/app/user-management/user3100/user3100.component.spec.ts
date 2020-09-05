import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { User3100Component } from './user3100.component';

describe('User3100Component', () => {
  let component: User3100Component;
  let fixture: ComponentFixture<User3100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User3100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User3100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
