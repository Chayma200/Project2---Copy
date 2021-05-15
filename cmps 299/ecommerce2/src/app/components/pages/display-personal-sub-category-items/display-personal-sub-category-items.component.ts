import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalInventoryService } from '../my-account/personal-inventory/personal-inventory.service';

@Component({
  selector: 'app-display-personal-sub-category-items',
  templateUrl: './display-personal-sub-category-items.component.html',
  styleUrls: ['./display-personal-sub-category-items.component.sass']
})
export class DisplayPersonalSubCategoryItemsComponent implements OnInit {

  subcategoryItems: Array<any> = new Array();
  categoryId: number;
  subcategoryId: number;
  companyName: string;
  constructor(private route: ActivatedRoute, private perInService: PersonalInventoryService) { }

  ngOnInit(): void {
    let catId = parseInt(this.route.snapshot.paramMap.get("categoryId"));
    let subcatId = parseInt(this.route.snapshot.paramMap.get("subcategoryId"));

    let companyname = this.route.snapshot.paramMap.get("companyName");
    this.companyName = companyname;

    this.categoryId = catId;
    this.subcategoryId = subcatId;
    this.perInService.getPersonalInventoryItems(this.companyName, this.categoryId, this.subcategoryId).subscribe((data: Array<any>) => {
      for (let i = 0; i < data.length; i++) {
        this.subcategoryItems.push(data[i]);
        console.log(this.subcategoryItems);
      }
    });
  }

}
