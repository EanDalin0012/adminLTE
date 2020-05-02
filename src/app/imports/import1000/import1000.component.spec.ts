import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Import1000Component } from './import1000.component';

describe('Import1000Component', () => {
  let component: Import1000Component;
  let fixture: ComponentFixture<Import1000Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Import1000Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Import1000Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
