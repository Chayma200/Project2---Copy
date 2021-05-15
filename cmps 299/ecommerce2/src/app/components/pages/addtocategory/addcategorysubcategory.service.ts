import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddcategorysubcategoryService {

  url = "http://localhost:8342/";
  constructor(private http: HttpClient) { }

  addCategory(data) {
    return this.http.post(`${this.url}api/Categories/AddCategory`, data, { responseType: "text" });
  }

  addSubcategory(data) {
    return this.http.post(`${this.url}api/SubCategories/AddSubCategory`, data, { responseType: "text" });
  }
}
