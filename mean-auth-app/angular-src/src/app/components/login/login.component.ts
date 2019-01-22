import { Component, OnInit } from '@angular/core';
import { User, UserLogin } from '../models/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginCreds: UserLogin;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
  }

  onLoginSubmit(formValues) {
    this.loginCreds = formValues.value;
    console.log(this.loginCreds);
  }

  this.authService.authenticateUser(this.loginCreds).subscribe(data => {
    console.log(data);
  });

}
