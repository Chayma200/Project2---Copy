import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddcategorysubcategoryService } from '../addtocategory/addcategorysubcategory.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.sass']
})
export class AddCategoryComponent implements OnInit {

  addCategoryForm: FormGroup;
  success: boolean = false;
  successMessage: string;
  constructor(private catsubcat: AddcategorysubcategoryService, private route: Router) { }

  ngOnInit(): void {
    this.addCategoryForm = new FormGroup({
      category_nameEN: new FormControl("", Validators.required)
    });
  }

  onSubmit() {
    const data = {
      "category_nameEN": this.addCategoryForm.value.category_nameEN,
    }
    if (this.addCategoryForm.valid) {
      this.catsubcat.addCategory(data).subscribe(
        data => {
          console.log(data);
          if (data.trim() === "Already Added") {
            alert("The Categoy you tried to add already exist!");
          }
          else if (data.trim() === "Added Successfully") {
            this.success = true;
            this.successMessage = "The Category has been added Successfully!";
            setTimeout(function () {
              window.location.reload();
            }, 2000);
          }
          
        });
    }
  }

}
