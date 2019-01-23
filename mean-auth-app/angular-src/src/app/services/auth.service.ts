import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User, ServerResponse, UserLogin } from '../components/models/user';
import { Observable } from 'rxjs';
import { headersToString } from 'selenium-webdriver/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  authToken: any;
  userLogin: UserLogin;
  apiUrl: 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
    ) { }

  registerUser(user: User): Observable<ServerResponse> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post<ServerResponse>(`users/register`, user, {headers: headers});
  }

  authenticateUser(userLogin: UserLogin) {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post<ServerResponse>(`users/authenticate`, userLogin, {headers: headers});
  }

  getProfile() {
    this.loadToken();
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': this.authToken
    });
    return this.http.get<User>(`users/profile`, {headers: headers});
  }


  storeUserData(serverResponse: ServerResponse) {
    localStorage.setItem('id_token', serverResponse.token);
    localStorage.setItem('user', JSON.stringify(serverResponse.user));
    this.authToken = serverResponse.token;
    this.user = serverResponse.user;
  }

  tokenExpired() {
    return this.jwtHelper.isTokenExpired();
  }


  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


}
