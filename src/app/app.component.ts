import { Component } from '@angular/core';
import { AuthenticationService } from './services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tex-cards';

  constructor(public authService: AuthenticationService) {

  }

  onLogout(): void {
    this.authService.logOut();
  }

}
