import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild("username") usernameInput?: ElementRef;
  @ViewChild("password") passwordInput?: ElementRef;

  public wrongCredentials: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.authenticate(this.usernameInput?.nativeElement.value, this.passwordInput?.nativeElement.value).subscribe(response => {
      this.router.navigate(['']);
    }, (error) => { this.wrongCredentials = true });
  }

}
