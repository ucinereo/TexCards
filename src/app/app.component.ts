import {Component, OnInit} from '@angular/core';
import { AuthenticationService } from './services/auth/authentication.service';
import {Router} from "@angular/router";
import {bootstrapApplication} from "@angular/platform-browser";
import {ErrorService} from "./services/error.service";

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'tex-cards';

  private errorModal: any;
  public errorMsg: string = "";

  constructor(public authService: AuthenticationService, private errorService: ErrorService, public router: Router) {
    errorService.addListener("error", (msg) => this.showErrorModal(msg));
  }

  onLogout(): void {
    this.authService.logOut();
  }

  ngOnInit(): void {
    this.errorModal = new window.bootstrap.Modal(document.getElementById('errorModal'));
  }

  public showErrorModal(msg?: string): void {
    this.errorMsg = msg!;
    this.errorModal.show();
  }

  public closeErrorModal(): void {
    this.errorModal.hide();
  }

}
