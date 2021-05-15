import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddcategorysubcategoryService } from './addcategorysubcategory.service';

@Component({
  selector: 'app-addtocategory',
  templateUrl: './addtocategory.component.html',
  styleUrls: ['./addtocategory.component.sass']
})
export class AddtocategoryComponent implements OnInit {

  addSubCategoryForm: FormGroup;
  categoryID: number;
  success: boolean = false;
  successMessage: string;
  constructor(private route: ActivatedRoute, private catsubcat: AddcategorysubcategoryService) { }

  ngOnInit(): void {
    let catId = parseInt(this.route.snapshot.paramMap.get("categoryId"));
    this.categoryID = catId;

    this.addSubCategoryForm = new FormGroup({
      subCategory_NameEN: new FormControl("", Validators.required)
    });
    
    console.log(this.categoryID);
  }

  onSubmit() {
    const data = {
      "subCategory_NameEN": this.addSubCategoryForm.value.subCategory_NameEN,
      "categoryID": this.categoryID
    }
    if (this.addSubCategoryForm.valid) {
      this.catsubcat.addSubcategory(data).subscribe(
        data => {
          console.log(data);
          if (data.trim() === "Already Added") {
            alert("The Subcategoy you tried to add already exist!");
          }
          else if (data.trim() === "Added Successfully") {
            this.success = true;
            this.successMessage = "The Subcategory has been added Successfully!";
            setTimeout(function () {
              window.location.reload();
            }, 2000);
          }
        });
    }
  }
}
