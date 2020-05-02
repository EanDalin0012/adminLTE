import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Import1200Component } from './import1200.component';

describe('Import1200Component', () => {
  let component: Import1200Component;
  let fixture: ComponentFixture<Import1200Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Import1200Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Import1200Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
