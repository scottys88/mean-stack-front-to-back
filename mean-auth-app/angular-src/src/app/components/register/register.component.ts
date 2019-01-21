import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User;

  constructor(private validateService: ValidateService,
              private flashMessages: FlashMessagesService,
              private authService: AuthService,
              private router: Router
            ) { }

  ngOnInit() {
  }

  onRegisterSubmit(e) {
    const formValues = e.value;
    this.user = {
      name: formValues.name,
      username: formValues.username,
      email: formValues.email,
      password: formValues.password
    };
    if (!this.validateService.validateRegister(this.user)) {
      this.flashMessages.show('You must complete all fields', { cssClass: 'alert-danger'});
      return false;
    }

    if (!this.validateService.validateEmail(this.user.email)) {
      this.flashMessages.show('You must enter a valid email', { cssClass: 'alert-danger'});
      console.log('invalid email');
      return false;
    }

    // Register User
    this.authService.registerUser(this.user).subscribe(data => {
      if (data) {
        console.log(data.success);
        this.router.navigate(['/login']);
      } else {
        this.flashMessages.show('Somethign went wrong', { cssClass: 'alert-danger'});
      }
    });



    console.log('user', this.user);
  }

}
