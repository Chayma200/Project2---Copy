import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  url = "http://localhost:8342/";
  galleryURL = "http://localhost:1264/";
  constructor(private http: HttpClient) { }

  getAllItems(catID: number, subCatID: number) {
    return this.http.get < String>(`${this.url}api/Items/GetAllItems/${catID}/${subCatID}`);
  }

  getItemImage(imageID: string) {
    return this.http.get(`${this.galleryURL}api/ImagePath/GetImagePath/${imageID}`, { responseType: "text" });
  }

  //async getItemTypes(itemID: string) {
  //  return await this.http.get(`${this.url}api/CharacteristicTypes/GetTypes/${itemID}`).toPromise();
  //}

  //async getItemValues(itemID: string, typeID: string) {
  //  return await this.http.get(`${this.url}api/CharacteristicValues/GetValues/${itemID}/${typeID}`).toPromise();
  //}

  getTypesValues(itemID: string) {
    return this.http.get(`${this.url}api/CharacteristicTypes/GetTypesValues/${itemID}`);
  }

  addItemToWishList(item_ID: string, user: string) {
    return this.http.get(`${this.url}api/wishList/AddToWishList/${item_ID}/${user}`);
  }

  removeItemFromWishList(item_ID: string, user: string) {
    return this.http.get(`${this.url}api/wishList/RemoveFromWishList/${item_ID}/${user}`);
  }

  getWishListItems(userID: string) {
    return this.http.get(`${this.url}api/wishList/GetWishListItems/${userID}`);
  }

  removeAllItemsFromWishList(user: string) {
    return this.http.get(`${this.url}api/wishList/RemoveAllFromWishList/${user}`);
  }

  //getAllCategoryItems(catID: number, subCatID: number) {
  //  return this.http.get(`${this.url}api/Items/GetAllItems/${catID}/${subCatID}`);
  //}

  //getAllSubcategoryItems(catID: number, subCatID: number) {
  //  return this.http.get(`${this.url}api/Items/GetAllItems/${catID}/${subCatID}`);
  //}
}
