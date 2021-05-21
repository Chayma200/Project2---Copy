import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  _url = "http://localhost:9781/";
  constructor(private http: HttpClient) { }

  getOrderInfo(userID: string, orderID: number) {
    return this.http.get(`${this._url}api/ItemInBaskets/getorderbyid/${userID}/${orderID}`)
  }
}
