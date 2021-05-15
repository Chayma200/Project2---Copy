import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonalInventoryService {
  url = "http://localhost:8342/";
  constructor(private http: HttpClient) { }

  getPersonalInventoryItems(companyName: string, catId: number, subcatId: number) {
    return this.http.get(`${this.url}api/Items/GetPersonalInventoryItems/${companyName}/${catId}/${subcatId}`);
  }

  getPersonalInventoryCategories(companyName: string){
    return this.http.get(`${this.url}api/Items/GetPersonalCategories/${companyName}`);
  }

  getPersonalInventorySubCategories(companyName: string, catID: number) {
    return this.http.get(`${this.url}api/Items/GetPersonalSubCategories/${companyName}/${catID}`);
  }
}
