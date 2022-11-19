import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FlashcardService } from '../services/flashcard.service';
import { UserPermission } from '../model/user-permission';

@Component({
  selector: 'app-cardset-share',
  templateUrl: './cardset-share.component.html',
  styleUrls: ['./cardset-share.component.scss']
})
export class CardsetShareComponent implements OnInit {

  @ViewChild("iUsername") iUsername!: ElementRef;
  @ViewChild("iRead") iRead!: ElementRef;
  @ViewChild("iWrite") iWrite!: ElementRef;

  public userPermissions!: UserPermission[];
  private flashcardSetID!: number;
  public flashcardSetName: string = "Flashcard set name";

  constructor(private flashcardService: FlashcardService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flashcardSetID = params['id'];
      this.flashcardService.getFlahcardSetPermissions(this.flashcardSetID).subscribe(response => {
        this.userPermissions = response.data;    
      }, (error) => { });
      this.flashcardService.getFlashcardSetName(this.flashcardSetID).subscribe(response => {
        this.flashcardSetName = response.data.flashcardSetName;
        this.titleService.setTitle("Tex-Cards " + this.flashcardSetName);
      }, (error) => { });
    });
  }

  changeUserReadPermissionPermission(username: string, e: any): void {
    this.userPermissions.find(element => element.username == username)!.readPermission = e.target.checked;
    this.flashcardService.editFlashcardSetUserPermission(this.userPermissions.find(element => element.username == username)!).subscribe(response => { }, (error) => { });
  }

  changeUserWritePermissionPermission(username: string, e: any): void {
    this.userPermissions.find(element => element.username == username)!.writePermission = e.target.checked;
    this.flashcardService.editFlashcardSetUserPermission(this.userPermissions.find(element => element.username == username)!).subscribe(response => { }, (error) => { });
  }

  removeUserPermission(username: string): void {
    this.flashcardService.removeFlashcardSetUserPermission(this.userPermissions.find(element => element.username == username)!).subscribe(response => {
      if (response.data) {
        this.userPermissions!.forEach((element, index) => {
          if (element.username == username) {
            this.userPermissions.splice(index, 1);
          }
        });
      }
    }, (error) => { });
  }

  addUserPermission(): void {
    let username = this.iUsername.nativeElement.value;
    let read = this.iRead.nativeElement.checked;
    let write = this.iWrite.nativeElement.checked;
    let userPermission = new UserPermission(username, this.flashcardSetID, read, write);
    this.flashcardService.addFlashcardSetUserPermission(userPermission).subscribe(response => {
      if (response.data) {
        this.userPermissions.push(userPermission);
      }
    }, (error) => { });
    this.iUsername.nativeElement.value = "";
  }

}
