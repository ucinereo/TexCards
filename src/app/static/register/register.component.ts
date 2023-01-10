import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username: string = "";
  email: string = "";
  password: string = "";

  public errorMsg: string = "Error";
  public registrationError: boolean = false;

  constructor(private authService: AuthenticationService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Tex-Cards Register");
  }

  @HostListener('document:keydown.enter')
  onRegister(): void {
     if (this.username.length > 0 && this.email.length > 0 && this.password.length > 0) {
       this.authService.register(this.username, this.email, this.password).subscribe(data => {

       }, (error) => {
         this.errorMsg = error.error.message;
         this.registrationError = true;
       });
     }
  }

}
