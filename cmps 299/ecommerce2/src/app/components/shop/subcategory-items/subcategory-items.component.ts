import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../../pages/register/register.service';
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
  userID: string;
  constructor(private route: ActivatedRoute, private itemsService: ItemsService, private registerService: RegisterService) { }

  ngOnInit(): void {
    this.registerService.getUserID().subscribe(data => { this.userID = data; console.log(this.userID); });

    let catID = parseInt(this.route.snapshot.paramMap.get("categoryID"));
    this.categoryID = catID;

    let subcatID = parseInt(this.route.snapshot.paramMap.get("subcategoryID"));
    this.subcategoryID = subcatID;

    this.itemsService.getAllItems(this.categoryID, this.subcategoryID).subscribe(data => { this.allsubcategoryitems = data; console.log(this.allsubcategoryitems); });
  }

  public addToWishlist(item) {
    let itemID = item.item.itemID;
    this.itemsService.addItemToWishList(itemID, this.userID).subscribe(data => {
      console.log(data)
      if (data === "Added to wish list") {
        alert("Item added to wish list!");
      }
      else if (data === "Item is already in the wishList") {
        alert("Item already exist in the wish list");
      }
    });
  }

}
