import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  _url = 'http://localhost:44347/';

  constructor(private http: HttpClient) { }

  register(data) {
    return this.http.post<any>(`${this._url}api/ApplicationUser/Register`, data);
  }

  registerSeller(data) {
    return this.http.post<any>(`${this._url}api/ApplicationUser/RegisterSeller`, data);
  }

  getUsernames() {
    return this.http.get(`${this._url}api/ApplicationUser/GetUserNames`);
  }

  login(data) {
    return this.http.post(this._url + 'api/ApplicationUser/Login', data);
  }

  getUserID() {
    var t = localStorage.getItem("token");
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
    return this.http.get(`${this._url}api/ApplicationUser/GetUserID`, { headers: headers_object, responseType: "text" });
  }

  GetCompanyName() {
    var t = localStorage.getItem("token");
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
    return this.http.get(`${this._url}api/ApplicationUser/GetCompanyName`, { headers: headers_object, responseType: "text" });
  }

  GetUserName() {
    var t = localStorage.getItem("token");
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + t);
    return this.http.get(`${this._url}api/ApplicationUser/GetUserName`, { headers: headers_object, responseType: "text" });
  }
}
