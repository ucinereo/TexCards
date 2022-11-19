import { UserSettings } from "./user-settings";

export class EditUserSettingRequest {
    userSettings: UserSettings;

    constructor(userSettings: UserSettings){
        this.userSettings = userSettings;
    }
}
