import { Component } from '@angular/core';
import { AuthenticationService } from './services/auth/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tex-cards';

  constructor(public authService: AuthenticationService, public router: Router) {

  }

  onLogout(): void {
    this.authService.logOut();
  }

}
