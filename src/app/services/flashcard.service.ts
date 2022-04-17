import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { FlashcardsSets } from '../flashcards-sets';
import { FlashcardSet } from '../flashcard-set';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  private REST_API_SERVER = "http://192.168.178.93:8080/";

  constructor(private httpClient: HttpClient) {

  }

  public getFlashcardsSets(): Observable<FlashcardsSets> {
    return this.httpClient.get<FlashcardsSets>(this.REST_API_SERVER + "flashcard-sets");
  }

  public getFlashcardSet(id: number): Observable<FlashcardSet> {
    const params = new HttpParams().set("id", id);
    return this.httpClient.get<FlashcardSet>(this.REST_API_SERVER + "flashcard-set", {params});
  }

  public editFlashcardSet(flashcardSet: FlashcardSet): Observable<boolean> {
    return this.httpClient.put<boolean>(this.REST_API_SERVER + "flashcard-set-edit", flashcardSet);
  }

  public createNewFlashcardSet(flashcardSetName: string): Observable<number> {
    return this.httpClient.post<number>(this.REST_API_SERVER + "flashcard-set-create", flashcardSetName);
  }

}
