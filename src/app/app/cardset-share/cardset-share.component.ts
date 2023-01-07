import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FlashcardService } from '../../services/flashcard.service';
import { UserPermission } from '../../model/user-permission';
import {FlashcardSetPermissionList} from "../../model/flashcard-set-permission-list";
import {GrantWritePermissionRequest} from "../../model/grant-write-permission-request";
import {GrantReadPermissionRequest} from "../../model/grant-read-permission-request";
import {RemoveWritePermissionRequest} from "../../model/remove-write-permission-request";
import {RemoveReadPermissionRequest} from "../../model/remove-read-permission-request";

@Component({
  selector: 'app-cardset-share',
  templateUrl: './cardset-share.component.html',
  styleUrls: ['./cardset-share.component.scss']
})
export class CardsetShareComponent implements OnInit {

  public userName: string = "";
  public permissionType: string = "read";

  public userPermissionList?: FlashcardSetPermissionList;
  private flashcardSetID!: number;
  public flashcardSetName: string = "Flashcard set name";

  constructor(private flashcardService: FlashcardService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flashcardSetID = params['id'];
      this.flashcardService.getFlashcardSetPermissions(this.flashcardSetID).subscribe(response => {
        this.userPermissionList = response.data;
        this.titleService.setTitle("Tex-Cards " + this.userPermissionList?.name);
      });
    });
  }

  revokePermission(index: number): void {
    if (this.userPermissionList?.permissions[index].writePermission) {
      // remove write permission
      const request = new RemoveWritePermissionRequest(this.userPermissionList?.permissions[index].username!, this.flashcardSetID);
      this.flashcardService.removeWritePermission(request).subscribe();
      this.userPermissionList.permissions[index].writePermission = false;
    } else {
      // remove read permission
      const request = new RemoveReadPermissionRequest(this.userPermissionList?.permissions[index].username!, this.flashcardSetID);
      this.flashcardService.removeReadPermission(request).subscribe();
      this.userPermissionList?.permissions.splice(index, 1);
    }
  }

  addUserPermission(): void {
    const permissionEntry = this.userPermissionList?.permissions.find(p => p.username == this.userName);
    if (permissionEntry) {
      if (!permissionEntry.writePermission && this.permissionType == "write") { // otherwise write permission already granted
        const request = new GrantWritePermissionRequest(this.userName, this.flashcardSetID);
        this.flashcardService.grantWritePermission(request).subscribe();
        permissionEntry.writePermission = true;
      }
    } else {
      if (this.permissionType == "read") {
        const request = new GrantReadPermissionRequest(this.userName, this.flashcardSetID);
        this.flashcardService.grantReadPermission(request).subscribe();
        const newEntry = new UserPermission(this.userName, this.flashcardSetID, true, false);
        this.userPermissionList?.permissions.push(newEntry);
      } else {
        const request = new GrantWritePermissionRequest(this.userName, this.flashcardSetID);
        this.flashcardService.grantWritePermission(request).subscribe();
        const newEntry = new UserPermission(this.userName, this.flashcardSetID, true, true);
        this.userPermissionList?.permissions.push(newEntry);
      }
    }
    this.userName = "";
  }

}
