import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";

  public wrongCredentials: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Tex-Cards Login");
  }

  @HostListener('document:keydown.enter')
  onSubmit(): void {
    this.authService.authenticate(this.username, this.password).subscribe(response => {
      this.router.navigate(['dashboard']);
    }, (error) => { this.wrongCredentials = true; });
  }


}
