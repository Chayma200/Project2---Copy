import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  _url = "http://localhost:9781/";
  constructor(private http: HttpClient) { }

  async addToBasket(data) {
    return await this.http.post(`${this._url}api/ItemInBaskets/additemtobasket`, data).toPromise();
  }

  //get all the skus in the basket for a user
  getItemsinBasket(userID: string) {
    return this.http.get(`${this._url}api/ItemInBaskets/GetBasketInfo/${userID}`);
  }

  getSubtotalPrice(userID: string) {
    return this.http.get(`${this._url}api/ItemInBaskets/GetSubtotal/${userID}`, { responseType: "text" });
  }

  DecreaseQuantity(data) {
    return this.http.put(`${this._url}api/ItemInBaskets/decreasequantity`, data);
  }

  IncreaseQuantity(data) {
    return this.http.put(`${this._url}api/ItemInBaskets/increasequantity`, data);
  }

  getTotalShippingCost(userID: string) {
    return this.http.get(`${this._url}api/ItemInBaskets/GetShippingCost/${userID}`, { responseType: "text" });
  }

  removeItemFromBasket(data) {
    return this.http.put(`${this._url}api/ItemInBaskets/removefrombasket`, data);
  }

  checkout(userID: string) {
    return this.http.get(`${this._url}api/ItemInBaskets/checkout/${userID}`);
  }

  clearAllItemsInBasket(userId: string) {
    return this.http.get(`${this._url}api/ItemInBaskets/clearAll/${userId}`, { responseType: "text" });
  }
}
