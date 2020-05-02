import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Export2000Component } from './export2000.component';

describe('Export2000Component', () => {
  let component: Export2000Component;
  let fixture: ComponentFixture<Export2000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Export2000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Export2000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
