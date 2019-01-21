import { Injectable } from '@angular/core';
import { User } from '../components/models/user';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user: User) {
    if (user.name === undefined ||
      user.email === undefined ||
      user.username === undefined ||
      user.password === undefined ) {
        return false;
      } else {
        return true;
      }
  }

  validateEmail(email: String) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
}
