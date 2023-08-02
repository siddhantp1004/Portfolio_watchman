import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { payload } from '../Models/payload';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7270/api/User/';

  payload!: payload;
  token: any;
  role: any;
  username: any;
  isAuthenticated: boolean = false;
  constructor(private http: HttpClient, private router: Router) {
    // this.payload=this.decodeToken(this.token)
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userObj);
  }
  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj).pipe(
      tap((response) => {
        this.token = response.token;
        this.payload = this.decodeToken(this.token);
        this.username = this.payload['name'];
        console.log(this.username);
        localStorage.setItem('uname', this.username);

        this.isAuthenticated = true;
        this.role = this.payload['role'];
        console.log(this.payload);
        localStorage.setItem('token', this.token);
        sessionStorage.setItem('token', this.token);
        this.username = localStorage.getItem('uname');
      })
    );
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  decodeToken(token: string): any {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
