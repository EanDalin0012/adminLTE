import { TestBed } from '@angular/core/testing';

import { FormaterInputService } from './formater-input.service';

describe('FormaterInputService', () => {
  let service: FormaterInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormaterInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
