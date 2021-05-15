import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryItemsComponent } from './subcategory-items.component';

describe('SubcategoryItemsComponent', () => {
  let component: SubcategoryItemsComponent;
  let fixture: ComponentFixture<SubcategoryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoryItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
