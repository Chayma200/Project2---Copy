import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../pages/SharedServices/items.service';

@Component({
  selector: 'app-subcategory-items',
  templateUrl: './subcategory-items.component.html',
  styleUrls: ['./subcategory-items.component.sass']
})
export class SubcategoryItemsComponent implements OnInit {

  categoryID: number;
  subcategoryID: number;
  allsubcategoryitems: {};
  constructor(private route: ActivatedRoute, private itemsService: ItemsService) { }

  ngOnInit(): void {
    let catID = parseInt(this.route.snapshot.paramMap.get("categoryID"));
    this.categoryID = catID;

    let subcatID = parseInt(this.route.snapshot.paramMap.get("subcategoryID"));
    this.subcategoryID = subcatID;

    this.itemsService.getAllItems(this.categoryID, this.subcategoryID).subscribe(data => { this.allsubcategoryitems = data; console.log(this.allsubcategoryitems); });
  }

}
