import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService } from '../SharedServices/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass']
})
export class BasketComponent implements OnInit {

  basketItems: Array<any> = new Array();
  userID: string;
  totalPrice: string;
  totalShippingCost: string;
  checkoutdata: {};

  constructor(private basketService: BasketService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let userid = this.route.snapshot.paramMap.get("userID");
    this.userID = userid;
    this.basketService.getItemsinBasket(this.userID).subscribe((data: Array<any>) => {
      for (let i = 0; i < data.length; i++) {
        this.basketItems.push(data[i]);
        console.log(this.basketItems);
      }
    });

    //get the subtotal of the basket
    this.basketService.getSubtotalPrice(this.userID).subscribe(data => {
      this.totalPrice = data;
      console.log(data);
    });
    //get the total shipping cost of the basket
    this.basketService.getTotalShippingCost(this.userID).subscribe(data => this.totalShippingCost = data);
  }

  // Increase Product Quantity
  public increment(item) {
    const data = {
      "user": this.userID,
      "SKUID": parseInt(item.skuItem.skU_ID)
    };
    this.basketService.IncreaseQuantity(data).subscribe(result => console.log(result));
    window.location.reload();
  }

  //Decrease Product Quantity
  public decrement(item) {
    console.log(item);
    const data = {
      "user": this.userID,
      "SKUID": parseInt(item.skuItem.skU_ID)
    }
    this.basketService.DecreaseQuantity(data).subscribe(result =>
      console.log(result)
    );
    window.location.reload();
  }

  goToCheckout() {
    console.log(this.userID);
    this.basketService.checkout(this.userID).subscribe((result:Array<any>) => {
      console.log(result);
      if (result) {
        console.log(result);
        this.router.navigate(["pages/checkout", this.userID, result]).then(() => window.location.reload());
      }
      else if (result.toString() == "Cannot Proceed to Checkout!") {
        alert("Cannot Proceed in your order! Please Try Again!");
        window.location.reload();
      }
      else {
        let v: Array<any> = new Array();
        for (let i = 0; i < result.length; i++) {
          console.log(result[i].info[0]);
          v.push(result[i].info[0]);
        }
        console.log(v);
        let other = "";
        for (let j = 0; j<v.length; j++) {
          other += v + '\n';
        }
        alert("The following items are out of stock: \n" + other);
        window.location.reload();
      }
    });
  }

  removefrombasket(item) {
    const data = {
      "user": this.userID,
      "SKUID": item.skuItem.skU_ID
    }
    this.basketService.removeItemFromBasket(data).subscribe(result => console.log(result));
    alert("The item is removed from the basket!");
    window.location.reload();
  }

  removeAllBasketItems() {
    this.basketService.clearAllItemsInBasket(this.userID).subscribe((data:string) => {
      console.log(data);
      alert(data);
    });
  }
}
