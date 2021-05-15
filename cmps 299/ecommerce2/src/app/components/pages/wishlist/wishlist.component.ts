import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/modals/product.model';
import { BasketService } from '../../shared/services/basket.service';
import { WishlistService } from '../../shared/services/wishlist.service';
import { HomeComponent } from '../../shop/home/home.component';
import { RegisterService } from '../register/register.service';
import { ItemsService } from '../SharedServices/items.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.sass']
})
export class WishlistComponent implements OnInit {

  public product: Observable<Product[]> = of([]);
  wishlistItems: Array<any> = new Array();
  userID: string;
  constructor(private route: ActivatedRoute, private itemsService: ItemsService, private registerService: RegisterService, private basketService: BasketService, private wishlistService: WishlistService) {
    //this.product = this.wishlistService.getProducts();
    //this.product.subscribe(products => this.wishlistItems = products);
  }

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

   // Add to cart
  // public addToBasket(product: Product,  quantity: number = 1) {
  //  if (quantity > 0)
  //    this.basketService.addToBasket(product,quantity);
  //   this.wishlistService.removeFromWishlist(product);
  //}
  // Add to cart
  public addToBasket() {
    
  }

  // Remove from wishlist
  public removeItem(item) {
    this.itemsService.removeItemFromWishList(item.itemID, this.userID).subscribe(data => {
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
