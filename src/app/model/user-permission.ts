export class UserPermission {

    username!: string;
    flashcardSetID!: number;
    readPermission!: boolean;
    writePermission!: boolean;

    constructor(username: string, flashcardSetID: number, readPermission: boolean, writePermission: boolean) {
        this.username = username;
        this.flashcardSetID = flashcardSetID;
        this.readPermission = readPermission;
        this.writePermission = writePermission;
    }

}
