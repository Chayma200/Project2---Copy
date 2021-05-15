import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {


  baseUrl = "http://localhost:44347/";
  constructor(private http: HttpClient) { }

  changePassword(data) {
    var t = localStorage.getItem("token");
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
    return this.http.post(`${this.baseUrl}api/ApplicationUser/ChangePassword`, data, { headers: headers_object });
  }
}
