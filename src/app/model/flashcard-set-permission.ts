export class FlashcardSetPermission {
    username: string;
    readPermission: boolean;
    writePermission: boolean;

    constructor(username: string, readPermission: boolean, writePermission: boolean) {
        this.username = username;
        this.readPermission = readPermission;
        this.writePermission = writePermission;
    }
}
