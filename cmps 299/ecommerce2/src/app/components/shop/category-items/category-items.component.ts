import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../../pages/register/register.service';
import { ItemsService } from '../../pages/SharedServices/items.service';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.sass']
})
export class CategoryItemsComponent implements OnInit {

  categoryID: number;
  allcategoryitems: {};
  userID: string;
  constructor(private route: ActivatedRoute, private itemsService: ItemsService, private registerService: RegisterService) { }

  ngOnInit(): void {
    this.registerService.getUserID().subscribe(data => { this.userID = data; console.log(this.userID); });

    let catID = parseInt(this.route.snapshot.paramMap.get("categoryID"));
    this.categoryID = catID;

    this.itemsService.getAllItems(this.categoryID, -1).subscribe(data => { this.allcategoryitems = data; console.log(this.allcategoryitems); });

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
