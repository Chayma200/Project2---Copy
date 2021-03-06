import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CRCService {


  apiBaseUrl = 'http://localhost:44347/';

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get(`${this.apiBaseUrl}api/Countries`).pipe(
      catchError(this.handleError)
    );
  }

  getRegions(countryId: number) {
    return this.http.get(`${this.apiBaseUrl}api/Regions/${countryId}`).pipe(
      catchError(this.handleError)
    );
  }

  getCities(regionId: number) {
    return this.http.get(`${this.apiBaseUrl}api/Cities/${regionId}`).pipe(
      catchError(this.handleError)
    );
  }

  getGenders() {
    return this.http.get(`${this.apiBaseUrl}api/Genders`).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
