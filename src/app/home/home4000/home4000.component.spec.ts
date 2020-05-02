import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Home4000Component } from './home4000.component';

describe('Home4000Component', () => {
  let component: Home4000Component;
  let fixture: ComponentFixture<Home4000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home4000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home4000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
