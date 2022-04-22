import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { FlashcardService } from '../flashcard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  public authenticate(username: string, password: string) {
    return this.httpClient.post<any>(FlashcardService.REST_API_SERVER + "auth/login", {"username": username, "password": password}).pipe(map(userData => {
      sessionStorage.setItem("username", username);
      let tokenStr = "Bearer " + userData.token;
      sessionStorage.setItem("token", tokenStr);
      return userData;
    }));
  }

  isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem("username");
    return !(user == null);
  }

  logOut(): void {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
  }

}
