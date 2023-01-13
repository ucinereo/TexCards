import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/auth/authentication.service';
import {FlashcardService} from "../../services/flashcard.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username: string = "";
  email: string = "";
  password: string = "";

  public errorMsg: string = "";

  constructor(private flashcardService: FlashcardService, private authService: AuthenticationService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Tex-Cards Register");
  }

  @HostListener('document:keydown.enter')
  onRegister(): void {
     if (this.username.length > 0 && this.email.length > 0 && this.password.length > 0) {
       this.authService.register(this.username, this.email, this.password).subscribe(data => {
         this.flashcardService.getUserSettings().subscribe(response => {
           for (let e in response.data) {
             localStorage.setItem(e, response.data[e]);
           }
         });
         this.router.navigate(['dashboard']);
       }, (error) => {
         this.errorMsg = error.error.message;
       });
     }
  }

}
