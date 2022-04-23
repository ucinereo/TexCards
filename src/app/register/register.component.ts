import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild("iUsername") iUsername!: ElementRef;
  @ViewChild("iEmail") iEmail!: ElementRef;
  @ViewChild("iPassword") iPassword!: ElementRef;
  
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {

  }

  onRegister(): void {
    let username = this.iUsername.nativeElement.value;
    let email = this.iEmail.nativeElement.value;
    let password = this.iPassword.nativeElement.value;
    if (username.length > 0 && email.length > 0 && password.length > 0) {
      this.authService.register(username, email, password).subscribe(data => console.log(data));
    }
  }

}
