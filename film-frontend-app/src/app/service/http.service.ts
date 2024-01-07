import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, Subject   } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import {environment} from '../../environment/environment';
import { URLZ } from '../enum/url.enum';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = environment.apiUrl
  private authToken: string| null ; // Store the token securely, e.g., in localStorage

  private isAuthenticatedSubject = new Subject<boolean>();
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  constructor(private http: HttpClient) { 
    this.authToken = localStorage.getItem('token')
  }

  // checkAuthentication(): void {
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.authToken}`
  //   });

  //   this.http.get<boolean>(`${this.apiUrl}/${URLZ.LOGIN}`, { headers }).pipe(
  //     catchError(error => {
  //       this.isAuthenticatedSubject.error(error);
  //       throw error;
  //     })
  //   ).subscribe(response => {
  //     this.isAuthenticatedSubject.next(response);
  //   });
  // }

  get(endpoint: string, params?: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    const options = params ? { params } : {};
    return this.http.get(url, options);
  }
  
  post(endpoint: string, data: any): Observable<any> {
    
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data, { headers }).pipe(
      catchError(this.handleError)
    );;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      // Handle unauthorized access (e.g., redirect to login page)
      alert('Authentication failed: Unauthorized access');
      console.error('Authentication failed: Unauthorized access');
      // You can perform actions like redirecting to the login page or showing an error message.
    } else {
      // Handle other types of errors
      console.error(`An error occurred: ${error.error.message || error.message}`);
    }

    return throwError('Something went wrong; please try again later.');
  }
  
}
