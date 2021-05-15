import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  _url = "http://localhost:8342/";
  constructor(private http: HttpClient) { }

  getItemMainDetails(ItemId: string) {
    return this.http.get(`${this._url}api/Items/getItem/${ItemId}`);
  }

  getItemSKUInfo(ItemId: string) {
    return this.http.get(`${this._url}api/ItemSKUs/GetItemInfo/${ItemId}`);
  }

  getSKUQuantity(sku_ID: number) {
    return this.http.get(`${this._url}api/ItemSKUs/GetSKUQt/${sku_ID}`);
  }
}
