import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Import2200Component } from './import2200.component';

describe('Import2200Component', () => {
  let component: Import2200Component;
  let fixture: ComponentFixture<Import2200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Import2200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Import2200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
