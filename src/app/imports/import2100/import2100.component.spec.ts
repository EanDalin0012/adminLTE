import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Import2100Component } from './import2100.component';

describe('Import2100Component', () => {
  let component: Import2100Component;
  let fixture: ComponentFixture<Import2100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Import2100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Import2100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
