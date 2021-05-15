import { TestBed } from '@angular/core/testing';

import { AddcategorysubcategoryService } from './addcategorysubcategory.service';

describe('AddcategorysubcategoryService', () => {
  let service: AddcategorysubcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddcategorysubcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
