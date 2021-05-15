import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  _url = "http://localhost:8342/";
  constructor(private http: HttpClient) { }

  Search(data) {
    return this.http.get(`${this._url}api/Items/SearchFor/${data}`);
  }
}
