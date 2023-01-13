import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth/authentication.service';
import {FlashcardService} from "../../services/flashcard.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";

  public errorMsg: string = "";

  constructor(private authService: AuthenticationService, private flashcardService: FlashcardService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Tex-Cards Login");
  }

  @HostListener('document:keydown.enter')
  onSubmit(): void {
    this.authService.authenticate(this.username, this.password).subscribe(response => {
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
