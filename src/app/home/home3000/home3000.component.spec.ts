import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Home3000Component } from './home3000.component';

describe('Home3000Component', () => {
  let component: Home3000Component;
  let fixture: ComponentFixture<Home3000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home3000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home3000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
