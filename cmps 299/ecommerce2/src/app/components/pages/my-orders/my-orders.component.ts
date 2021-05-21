import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../SharedServices/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.sass']
})
export class MyOrdersComponent implements OnInit {

  orders: Array<any> = new Array();
  userID: string;

  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let userid = this.route.snapshot.paramMap.get("userID");
    this.userID = userid;

    this.orderService.getOrders(this.userID).subscribe((data: Array<any>) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.orders.push(data[i]);
      }
    });
  }

}
