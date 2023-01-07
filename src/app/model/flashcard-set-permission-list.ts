import {FlashcardSetPermission} from "./flashcard-set-permission";

export class FlashcardSetPermissionList {

  id: number;
  name: string;
  permissions: FlashcardSetPermission[];

  constructor(id: number, name: string, permissions: FlashcardSetPermission[]) {
    this.id = id;
    this.name = name;
    this.permissions = permissions;
  }
}
