import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FlashcardSet } from '../model/flashcard-set';
import { environment } from 'src/environments/environment';
import { FlashcardSetImport } from '../model/flashcard-set-import';
import {EditFlashcardSetRequest} from "../model/edit-flashcard-set-request";
import {AddStarRequest} from "../model/add-star-request";
import {RemoveStarRequest} from "../model/remove-star-request";
import {GrantWritePermissionRequest} from "../model/grant-write-permission-request";
import {RemoveWritePermissionRequest} from "../model/remove-write-permission-request";
import {RemoveReadPermissionRequest} from "../model/remove-read-permission-request";
import {GrantReadPermissionRequest} from "../model/grant-read-permission-request";
import {CreateFlashcardSetRequest} from "../model/create-flashcard-set-request";


@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  public static REST_API_SERVER = environment.apiHost;

  constructor(private httpClient: HttpClient) {

  }

  public getFlashcardSets() {
    return this.httpClient.get<any>(FlashcardService.REST_API_SERVER + "flashcard/get_flashcard_sets");
  }

  public getFlashcardSet(id: number) {
    const params = new HttpParams().set("flashcardSetId", id);
    return this.httpClient.get<any>(FlashcardService.REST_API_SERVER + "flashcard/get_flashcard_set", {params});
  }

  public getFlashcardSetName(id: number) {
    const params = new HttpParams().set("id", id);
    return this.httpClient.get<any>(FlashcardService.REST_API_SERVER + "flashcard-set-name", {params});
  }

  public getTagList() {
    return this.httpClient.get<any>(FlashcardService.REST_API_SERVER + "tag/get_tags");
  }

  public editFlashcardSet(request: EditFlashcardSetRequest) {
    return this.httpClient.put<any>(FlashcardService.REST_API_SERVER + "flashcard/edit_flashcard_set", request);
  }

  public importFlashcardSet(flashcardSetImport: FlashcardSetImport) {
    return this.httpClient.put<any>(FlashcardService.REST_API_SERVER + "flashcard-set-import", flashcardSetImport);
  }

  public createNewFlashcardSet(request: CreateFlashcardSetRequest) {
    return this.httpClient.post<any>(FlashcardService.REST_API_SERVER + "flashcard/create_flashcard_set", request);
  }

  public deleteFlashcardSet(flashcardSet: FlashcardSet) {
    return this.httpClient.put<any>(FlashcardService.REST_API_SERVER + "flashcard-set-delete", flashcardSet.id);
  }

  public addFlashcardStar(request: AddStarRequest) {
    return this.httpClient.put<any>(FlashcardService.REST_API_SERVER + "flashcard/add_star", request);
  }

  public removeFlashcardStar(request: RemoveStarRequest) {
    return this.httpClient.put<any>(FlashcardService.REST_API_SERVER + "flashcard/remove_star", request);
  }

  public getFlashcardSetPermissions(flashcardSetID: number) {
    const params = new HttpParams().set("flashcardSetId", flashcardSetID);
    return this.httpClient.get<any>(FlashcardService.REST_API_SERVER + "permission/get_user_permissions", {params});
  }

  public grantWritePermission(request: GrantWritePermissionRequest) {
    return this.httpClient.put<any>(FlashcardService.REST_API_SERVER + "permission/grant_write_permission", request);
  }

  public grantReadPermission(request: GrantReadPermissionRequest) {
    return this.httpClient.put<any>(FlashcardService.REST_API_SERVER + "permission/grant_read_permission", request);
  }

  public removeWritePermission(request: RemoveWritePermissionRequest) {
    return this.httpClient.put<any>(FlashcardService.REST_API_SERVER + "permission/remove_write_permission", request);
  }

  public removeReadPermission(request: RemoveReadPermissionRequest) {
    return this.httpClient.put<any>(FlashcardService.REST_API_SERVER + "permission/remove_read_permission", request);
  }

  public getUserSettings() {
    return this.httpClient.get<any>(FlashcardService.REST_API_SERVER + "user/get_user_settings");
  }

}
