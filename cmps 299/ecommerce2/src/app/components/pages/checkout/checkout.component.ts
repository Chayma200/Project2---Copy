import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../SharedServices/checkout.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass'],
})
export class CheckoutComponent implements OnInit {
  userID: string;
  orderID: number;
  orderInfo: {};

  constructor(private checkoutService: CheckoutService, private route: ActivatedRoute) { }

  ngOnInit() {
    let user = this.route.snapshot.paramMap.get("userID");
    this.userID = user;

    let order = this.route.snapshot.paramMap.get("orderID");
    this.orderID = parseInt(order);

    this.checkoutService.getOrderInfo(this.userID, this.orderID).subscribe(data => this.orderInfo = data);

  }
}
