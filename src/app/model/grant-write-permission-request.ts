export class GrantWritePermissionRequest {
    username: string;
    flashcardSetId: number;

    constructor(username: string, flashcardSetId: number) {
        this.username = username;
        this.flashcardSetId = flashcardSetId;
    }
}
