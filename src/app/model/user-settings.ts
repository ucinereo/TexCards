export class UserSettings {

    username: string;
    email: string;
    theme: number;
    learnSetting1: number;
    learnSetting2: number;
    learnSetting3: number;
    learnSetting4: number;
    learnSetting5: number;

    constructor(username: string, email: string, theme: number, learnSetting1: number, learnSetting2: number, learnSetting3: number, learnSetting4: number, learnSetting5: number) {
        this.username = username;
        this.email = email;
        this.theme = theme;
        this.learnSetting1 = learnSetting1;
        this.learnSetting2 = learnSetting2;
        this.learnSetting3 = learnSetting3;
        this.learnSetting4 = learnSetting4;
        this.learnSetting5 = learnSetting5;
    }

}
