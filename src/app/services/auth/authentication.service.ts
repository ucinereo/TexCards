import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { FlashcardService } from '../flashcard.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  public authenticate(username: string, password: string) {
    return this.httpClient.post<any>(FlashcardService.REST_API_SERVER + "auth/login", {"username": username, "password": password}).pipe(map(userData => {
      localStorage.setItem("username", username);
      let tokenStr = "Bearer " + userData.token;
      localStorage.setItem("token", tokenStr);
      return userData;
    }));
  }

  public register(username: string, email: string, password: string) {
    return this.httpClient.post<any>(FlashcardService.REST_API_SERVER + "auth/register", {"username": username, "email": email, "password": password}).pipe(map(userData => {
      if (!userData.error) {
        localStorage.setItem("username", username);
        let tokenStr = "Bearer " + userData.token;
        localStorage.setItem("token", tokenStr);
        this.router.navigate(['sets']);
        return userData;
      }
    }));
  }

  isUserLoggedIn(): boolean {
    let user = localStorage.getItem("username");
    return !(user == null);
  }

  logOut(): void {
    localStorage.clear();
  }

}
