import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  _url = "http://localhost:1026/";
  memberUrl = "http://localhost:44347/";

  constructor(private http: HttpClient) { }

  postFeedback(data) {
    return this.http.post(`${this._url}api/Feedback/AddFeedback`, data);
  }

  getItemAverageRate(itemID: string) {
    return this.http.get(`${this._url}api/Feedback/AverageRate/${itemID}`);
  }

  getItemFeedbacks(userID: string, itemID: string) {
    return this.http.get(`${this._url}api/Feedback/GetItemFeedbacks/${userID}/${itemID}`);
  }

  deleteFeedback(userID: string, feedbackID: string) {
    return this.http.get(`${this._url}api/Feedback/deleteFeedback/${userID}/${feedbackID}`);
  }

  getUserName(userID: string) {
    return this.http.get(`{this.memberUrl}api/ApplicationUser/GetUserName/${userID}`, { responseType: "text" });
  }
}
