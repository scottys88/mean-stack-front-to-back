import { Component, OnInit } from '@angular/core';
import { User, UserLogin, ServerResponse } from '../models/user';
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
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  onLoginSubmit(formValues) {
    this.loginCreds = formValues.value;
    console.log(this.loginCreds);
    this.authService.authenticateUser(this.loginCreds).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.authService.storeUserData(data);
        this.router.navigate(['/dashboard']);
        this.flashMessages.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 5000
        });
      } else {
        this.flashMessages.show(data.msg,
          {cssClass: 'alert-danger',
          timeout: 5000});
        this.router.navigate(['/login']);
      }
    });
  }



}
