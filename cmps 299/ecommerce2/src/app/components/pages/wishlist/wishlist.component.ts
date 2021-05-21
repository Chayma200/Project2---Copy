import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ItemsService } from '../../pages/SharedServices/items.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.sass']
})
export class WishlistComponent implements OnInit {

  wishlistItems: Array<any> = new Array();
  userID: string;
  constructor(private route: ActivatedRoute, private itemsService: ItemsService) {  }

  ngOnInit() {
    let userid = this.route.snapshot.paramMap.get("userID");
    this.userID = userid;
    this.itemsService.getWishListItems(this.userID).subscribe((data: Array<any>) => {
      for (let i = 0; i < data.length; i++) {
        this.wishlistItems.push(data[i]);
        console.log(this.wishlistItems);
      }
    });

  }

  // Remove from wishlist
  public removeItem(item) {
    let itemid = item.item.itemID;
    this.itemsService.removeItemFromWishList(itemid, this.userID).subscribe(data => {
      if (data === "Item removed from wishList") {
        alert("Item removed from wishList");
      }
      else if (data === "Item is not found in the wishList") {
        alert("Item is not found in the wishList");
      }
      window.location.reload();
    }),
      error => console.log("Error!", error);
  }

  removeAllWishListItems() {
    this.itemsService.removeAllItemsFromWishList(this.userID).subscribe(data => {
      if (data === "All of the Items are removed from wishList") {
        alert("All Items are removed from wishList");
      }
      else if (data === "No items in the wishlist!") {
        alert("No items in the wishlist!");
      }
      window.location.reload();
    }),
      error => console.log("Error!", error);
  }

}
