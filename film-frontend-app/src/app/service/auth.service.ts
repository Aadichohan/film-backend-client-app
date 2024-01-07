import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private accessToken: string | null = null;

  // Assume you have a method to set the access token upon successful login
  setAccessToken(token: string, id: string): void {
    localStorage.setItem('access_token', token)
    // localStorage.setItem('user_id', id)
    this.accessToken = token;
  }
  
  // Assume you have a method to clear the access token upon logout
  clearAccessToken(): void {
    localStorage.removeItem('access_token')
    this.accessToken = null;
  }

  // Check if the user is logged in based on the presence of a valid access token
  isLoggedIn(): boolean {
    let _access_token = localStorage.getItem('access_token')
    this.accessToken = (_access_token != '' || _access_token == undefined ) ? _access_token : null
    return !!this.accessToken;
  }
}
