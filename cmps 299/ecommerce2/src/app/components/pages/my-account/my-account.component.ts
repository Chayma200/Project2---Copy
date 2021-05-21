import { IndexOutOfBoundException } from '@angular-devkit/schematics/src/utility/update-buffer';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register/register.service';
import { CategoriesService } from '../SharedServices/categories.service';
import { PersonalInventoryService } from './personal-inventory/personal-inventory.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.sass']
})
export class MyAccountComponent implements OnInit {

  panelOpenState: boolean = false;
  allcategories: Array<any> = new Array();
  allsubcategories: Array<any> = new Array();
  allitems: {};
  companyName: string;
  userName: string;

  constructor(private registerService: RegisterService,private router: Router, private categoryService: CategoriesService) { }

  ngOnInit() {
    this.registerService.GetCompanyName().subscribe(data => this.companyName = data);
    this.registerService.GetUserName().subscribe(data => this.userName = data);

    this.categoryService.getCategoriesandSubCategories().subscribe((data: Array<any>) => {
      for (let i = 0; i < data.length; i++) {
        this.allcategories.push(data[i].cat);
        this.allsubcategories.push(data[i].subCats);
      }
      console.log(this.allcategories);
      console.log(this.allsubcategories);
    });

  }

  goToAddItem() {
    this.router.navigate(["pages/add-item"]).then(() => {
      window.location.reload();
    });
  }

  onSelect(category, s) {
    this.router.navigate(["pages/personal-inventory/personal-subcategory-items", category.category_ID, s.subCategoryID, this.companyName]).then(() => {
      window.location.reload();
    });
  }

  onClick(category) {
    this.router.navigate(["pages/personal-inventory/personal-category-items", category.category_ID, this.companyName]).then(() => {
      window.location.reload();
    });
  }

  addSubCategory(category) {
    this.router.navigate(["pages/personal-inventory", category.category_ID]).then(() => {
      window.location.reload();
    });
  }

  addCategory() {
    this.router.navigate(["pages/add-category"]).then(() => {
      window.location.reload();
    });
  }

  goToPersonalInventory() {
    this.router.navigate(["pages/my-account/personal-inventory", this.companyName]).then(() => {
      window.location.reload();
    });
  }
}

