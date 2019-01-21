import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../components/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  authToken: any;
  apiUrl: 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    const headers = new HttpHeaders();
    headers.append('Conent-type', 'application/json');
    return this.http.post<User>(`http://localhost:3000/users/register`, user, {headers: headers});
  }


}
