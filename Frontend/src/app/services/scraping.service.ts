import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScrapingService {

  baseUri:string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getMundoScraping() {
    return this.http.get("http://localhost:3000/api/elmundo").pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    );
  }

  getPaisScraping() {
    return this.http.get("http://localhost:3000/api/elpais").pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    );
  }


  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
