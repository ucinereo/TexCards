import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild("iUsername") iUsername!: ElementRef;
  @ViewChild("iEmail") iEmail!: ElementRef;
  @ViewChild("iPassword") iPassword!: ElementRef;

  public errorMsg: string = "Error";
  public registrationError: boolean = false;

  constructor(private authService: AuthenticationService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Tex-Cards Register");
  }

  @HostListener('document:keydown.enter')
  onRegister(): void {
    let username = this.iUsername.nativeElement.value;
    let email = this.iEmail.nativeElement.value;
    let password = this.iPassword.nativeElement.value;
    if (username.length > 0 && email.length > 0 && password.length > 0) {
      this.authService.register(username, email, password).subscribe(data => {

      }, (error) => {
        this.errorMsg = error.error.message;
        this.registrationError = true;
      });
    }
  }

}
