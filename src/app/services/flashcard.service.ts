import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'
import { FlashcardsSets } from '../flashcards-sets';
import { FlashcardSet } from '../flashcard-set';
import { FlashcardStar } from '../flashcard-star';
import { UserPermission } from '../user-permission';
import { FlashcardSetName } from '../flashcard-set-name';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  public static REST_API_SERVER = "http://192.168.178.93:8080/";

  constructor(private httpClient: HttpClient) {

  }

  public getFlashcardsSets(): Observable<FlashcardsSets> {
    return this.httpClient.get<FlashcardsSets>(FlashcardService.REST_API_SERVER + "flashcard-sets");
  }

  public getFlashcardSet(id: number): Observable<FlashcardSet> {
    const params = new HttpParams().set("id", id);
    return this.httpClient.get<FlashcardSet>(FlashcardService.REST_API_SERVER + "flashcard-set", {params});
  }

  public getFlashcardSetName(id: number): Observable<FlashcardSetName> {
    const params = new HttpParams().set("id", id);
    return this.httpClient.get<FlashcardSetName>(FlashcardService.REST_API_SERVER + "flashcard-set-name", {params});
  }

  public editFlashcardSet(flashcardSet: FlashcardSet): Observable<boolean> {
    return this.httpClient.put<boolean>(FlashcardService.REST_API_SERVER + "flashcard-set-edit", flashcardSet);
  }

  public createNewFlashcardSet(flashcardSetName: string): Observable<number> {
    return this.httpClient.post<number>(FlashcardService.REST_API_SERVER + "flashcard-set-create", flashcardSetName);
  }

  public deleteFlashcardSet(flashcardSet: FlashcardSet) {
    return this.httpClient.put<any>(FlashcardService.REST_API_SERVER + "flashcard-set-delete", flashcardSet.id);
  }

  public addFlashcardStar(flashcardSetID: number, flashcardTerm: string, flashcardDefinition: string) {
    return this.httpClient.put<any>(FlashcardService.REST_API_SERVER + "flashcard-add-star", new FlashcardStar(flashcardSetID, flashcardTerm, flashcardDefinition));
  }

  public removeFlashcardStar(flashcardSetID: number, flashcardTerm: string, flashcardDefinition: string) {
    return this.httpClient.put<any>(FlashcardService.REST_API_SERVER + "flashcard-remove-star", new FlashcardStar(flashcardSetID, flashcardTerm, flashcardDefinition));
  }

  public getFlahcardSetPermissions(flashcardSetID: number): Observable<UserPermission[]> {
    const params = new HttpParams().set("id", flashcardSetID);
    return this.httpClient.get<UserPermission[]>(FlashcardService.REST_API_SERVER + "flashcard-set-permissions", {params});
  }

  public editFlashcardSetUserPermission(userPermission: UserPermission): Observable<boolean> {
    return this.httpClient.put<boolean>(FlashcardService.REST_API_SERVER + "flashcard-set-change-permission", userPermission);
  }

  public removeFlashcardSetUserPermission(userPermission: UserPermission): Observable<boolean> {
    return this.httpClient.put<boolean>(FlashcardService.REST_API_SERVER + "flashcard-set-remove-permission", userPermission);
  }

  public addFlashcardSetUserPermission(userPermission: UserPermission): Observable<boolean> {
    return this.httpClient.put<boolean>(FlashcardService.REST_API_SERVER + "flashcard-set-add-permission", userPermission);
  }

}
