import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../pages/SharedServices/categories.service';

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.sass']
})
export class ProductLeftSidebarComponent implements OnInit {

  allcategories: Array<any> = new Array();
  allsubcategories: Array<any> = new Array();
  public viewType: string = 'grid';
  public viewCol: number = 25;

  constructor(private router: Router, private categoryService: CategoriesService) { }

  ngOnInit() {
    this.categoryService.getCategoriesandSubCategories().subscribe((data: Array<any>) => {
      for (let i = 0; i < data.length; i++) {
        this.allcategories.push(data[i].cat);
        this.allsubcategories.push(data[i].subCats);
      }
      console.log(this.allcategories);
      console.log(this.allsubcategories);
    });
  }

  onClick(category) {
    this.router.navigate(["home/category-items", category.category_ID]).then(() => {
      window.location.reload();
    });
  }

  onSelect(category, s) {
    this.router.navigate(["home/subcategory-items", category.category_ID, s.subCategoryID]).then(() => {
      window.location.reload();
    });
  }

  public changeViewType(viewType, viewCol){
    this.viewType = viewType;
    this.viewCol = viewCol;
  }
}
