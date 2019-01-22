import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User, ServerResponse, UserLogin } from '../components/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  authToken: any;
  userLogin: UserLogin;
  apiUrl: 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<ServerResponse> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post<ServerResponse>(`http://localhost:3000/users/register`, user, {headers: headers});
  }

  authenticateUser(userLogin: UserLogin) {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post<ServerResponse>(`http://localhost:3000/users/authenticate`, userLogin, {headers: headers});
  }

  storeUserData(serverResponse: ServerResponse) {
    localStorage.setItem('id_token', serverResponse.token);
    localStorage.setItem('user', JSON.stringify(serverResponse.user));
    this.authToken = serverResponse.token;
    this.user = serverResponse.user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


}
