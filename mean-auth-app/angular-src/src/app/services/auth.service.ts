import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User,ServerResponse, UserLogin } from '../components/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  authToken: any;
  apiUrl: 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<ServerResponse> {
    const headers = new HttpHeaders();
    headers.append('Conent-type', 'application/json');
    return this.http.post<ServerResponse>(`http://localhost:3000/users/register`, user, {headers: headers});
  }

  authenticateUser(UserLogin: UserLogin) {
    const headers = new HttpHeaders();
    headers.append('Conent-type', 'application/json');
    return this.http.post<ServerResponse>(`http://localhost:3000/users/authenticate`, UserLogin, {headers: headers});
  }


}
