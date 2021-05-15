import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalInventoryService } from '../my-account/personal-inventory/personal-inventory.service';

@Component({
  selector: 'app-display-personal-category-items',
  templateUrl: './display-personal-category-items.component.html',
  styleUrls: ['./display-personal-category-items.component.sass']
})
export class DisplayPersonalCategoryItemsComponent implements OnInit {
  categoryItems: Array<any> = new Array();
  categoryId: number;
  companyName: string;
  constructor(private route: ActivatedRoute, private perInService: PersonalInventoryService) { }

  ngOnInit(): void {
    let catId = parseInt(this.route.snapshot.paramMap.get("categoryId"));
    this.categoryId = catId;

    let companyname = this.route.snapshot.paramMap.get("companyName");
    this.companyName = companyname;

    this.perInService.getPersonalInventoryItems(this.companyName, this.categoryId, -1).subscribe((data: Array<any>) => {
      for (let i = 0; i < data.length; i++) {
        this.categoryItems.push(data[i]);
        console.log(this.categoryItems);
      }
    });
  }

}
