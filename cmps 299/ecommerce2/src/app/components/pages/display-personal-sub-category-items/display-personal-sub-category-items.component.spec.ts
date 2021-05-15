import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPersonalSubCategoryItemsComponent } from './display-personal-sub-category-items.component';

describe('DisplayPersonalSubCategoryItemsComponent', () => {
  let component: DisplayPersonalSubCategoryItemsComponent;
  let fixture: ComponentFixture<DisplayPersonalSubCategoryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayPersonalSubCategoryItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPersonalSubCategoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
