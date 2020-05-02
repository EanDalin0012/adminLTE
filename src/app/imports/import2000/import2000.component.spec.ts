import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Import2000Component } from './import2000.component';

describe('Import2000Component', () => {
  let component: Import2000Component;
  let fixture: ComponentFixture<Import2000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Import2000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Import2000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
