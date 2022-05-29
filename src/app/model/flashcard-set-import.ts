export class FlashcardSetImport {

    flashcardSetID: number;
    tdSeparator: string;
    cardSeparator: string;
    alignment: number;
    inputTxt: string;

    constructor(flashcardSetID: number, tdSeparator: string, cSeparator: string, alignment: number, inputTxt: string) {
        this.flashcardSetID = flashcardSetID;
        this.tdSeparator = tdSeparator;
        this.cardSeparator = cSeparator;
        this.alignment = alignment;
        this.inputTxt = inputTxt;
    }

}
