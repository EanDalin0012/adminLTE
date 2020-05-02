import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Import1100Component } from './import1100.component';

describe('Import1100Component', () => {
  let component: Import1100Component;
  let fixture: ComponentFixture<Import1100Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Import1100Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Import1100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
