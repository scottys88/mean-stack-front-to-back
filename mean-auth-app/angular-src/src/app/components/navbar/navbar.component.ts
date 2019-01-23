import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isTokenExpired: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
    ) { }

  ngOnInit() {

  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessages.show('You have been logged out', { cssClass: 'alert-success' });
    this.router.navigate(['/login']);
    return false;
  }

}
