import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { basketItem } from 'src/app/modals/basket-item';
import { BasketService } from '../../shared/services/basket.service';
import { ItemsService } from '../SharedServices/items.service';
import { Product } from 'src/app/modals/product.model';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  //public product: Observable<Product[]> = of([]);
  //basketItems: Array<any> = new Array();
  //userID: string;
  
  //constructor(private route: ActivatedRoute, private itemsService: ItemsService, private registerService: RegisterService, private basketService: BasketService) { }

  ngOnInit() {

    //let userid = this.route.snapshot.paramMap.get("userID");
    //this.userID = userid;
    //this.basketService.Getitemsinbasket(this.userID).subscribe((data: Array<any>) => {
    //  for (let i = 0; i < data.length; i++) {
    //    this.basketItems.push(data[i]);
    //    console.log(this.basketItems);
    //  }
    //});
  }

  //// Remove basket items
  ///*public removeItem(item: basketItem) {
  //  this.basketService.removeFromBasket(item);
  //}*/

  //public removefrombasket(item) {
  //  let SKUID = item.SKUID
  //  this.basketService.removefrombasket(SKUID, this.userID).subscribe(data => {
  //    if (data === "Item removed from basket") {
  //      alert("Item removed from basket");
  //    }
  //    else if (data === "Item is not found in the basket") {
  //      alert("Item is not found in the basket");
  //    }
  //    window.location.reload();
  //  }),
  //    error => console.log("Error!", error);
  //}

  //// Increase Product Quantity
  //public increment(product: any, quantity: number = 1) {
  //  this.basketService.updateBasketQuantity(product,quantity);
  //}

  //// Decrease Product Quantity
  //public decrement(product: any, quantity: number = -1) {
  //  this.basketService.updateBasketQuantity(product,quantity);
  //}
/** 
  // Increase Product Quantity
  public increment() {
    const data = {
      "user": 1,
      "SKUID": 1,
    }
    this.basketService.increaseBasketQuantity(data).subscribe;
  }

  // Decrease Product Quantity
  public decrement() {
    const data = {
      "user": 1,
      "SKUID": 1,
    }
    this.basketService.decreaseBasketQuantity(data).subscribe;
  }
*/
/*
  // Get Total
  public getTotal(): Observable<number> {
    return this.basketService.getTotalAmount();
  }*/

}
