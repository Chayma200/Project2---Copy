import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  _url = "http://localhost:9781/";
  constructor(private http: HttpClient) { }

  getOrders(userID: string) {
    return this.http.get(`${this._url}api/ItemInBaskets/GetOrderInfo/${userID}`);
  }
}
