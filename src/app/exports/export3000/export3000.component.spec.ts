import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Export3000Component } from './export3000.component';

describe('Export3000Component', () => {
  let component: Export3000Component;
  let fixture: ComponentFixture<Export3000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Export3000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Export3000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
