import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  _url = "http://localhost:8342/";
  constructor(private http: HttpClient) { }

  //get the main details for the item
  getItemMainDetails(ItemId: string) {
    return this.http.get(`${this._url}api/Items/getItem/${ItemId}`);
  }

  //get all skus for an item
  getItemSKUInfo(ItemId: string) {
    return this.http.get(`${this._url}api/ItemSKUs/GetItemInfo/${ItemId}`);
  }

  //get all sku info for the specific skuid
  getSingleSKUInfo(skuid: number) {
    return this.http.get(`${this._url}api/ItemSKUs/GetSKU/${skuid}`);
  }
}
