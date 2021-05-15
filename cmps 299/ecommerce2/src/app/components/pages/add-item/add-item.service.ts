import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddItemService {

  _url = "http://localhost:8342/";
  constructor(private http: HttpClient) { }

  async AddItem(data) {
    return await this.http.post(`${this._url}api/Items/AddItem`, data, { responseType: "text" }).toPromise();
  }

  async GetItemTypes(item_ID: string): Promise<Observable<any[]>> {
    return await this.http.get<any>(`${this._url}api/CharacteristicTypes/GetTypes/${item_ID}`).toPromise();
  }

  GetItemValues(item_ID: string, T_id: string){
    return this.http.get(`${this._url}api/CharacteristicValues/GetValues/${item_ID}/${T_id}`);
  }

  AddItemSKU(data) {
    return this.http.post(`${this._url}api/ItemSKUs/AddSKU`, data, { responseType: "text" });
  }
}
