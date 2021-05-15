import { TestBed } from '@angular/core/testing';

import { PersonalInventoryService } from './personal-inventory.service';

describe('PersonalInventoryService', () => {
  let service: PersonalInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
