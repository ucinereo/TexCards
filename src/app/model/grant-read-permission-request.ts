export class GrantReadPermissionRequest {
    username: string;
    flashcardSetId: number;

    constructor(username: string, flashcardSetId: number) {
        this.username = username;
        this.flashcardSetId = flashcardSetId;
    }
}
