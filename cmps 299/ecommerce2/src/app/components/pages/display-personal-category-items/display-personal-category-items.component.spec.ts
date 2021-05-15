import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPersonalCategoryItemsComponent } from './display-personal-category-items.component';

describe('DisplayPersonalCategoryItemsComponent', () => {
  let component: DisplayPersonalCategoryItemsComponent;
  let fixture: ComponentFixture<DisplayPersonalCategoryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayPersonalCategoryItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPersonalCategoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
