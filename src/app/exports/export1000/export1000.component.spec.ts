import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Export1000Component } from './export1000.component';

describe('Export1000Component', () => {
  let component: Export1000Component;
  let fixture: ComponentFixture<Export1000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Export1000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Export1000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
