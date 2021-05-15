import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../pages/SharedServices/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {

  allcategories: {};
  constructor(private router: Router, private cat: CategoriesService) { }

  ngOnInit() {
    this.cat.getCategories().subscribe(data => this.allcategories = data);
  }

  GoToCategory(category) {
    this.router.navigate(["/home/category-items", category.category_ID]).then(() => {
      window.location.reload();
    });
  }
}
