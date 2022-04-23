export class FlashcardStar {

    flashcardSetID: number;
    flashcardTerm: string;
    flashcardDefinition: string;

    constructor(flashcardSetID: number, flashcardTerm: string, flashcardDefinition: string) {
        this.flashcardSetID = flashcardSetID;
        this.flashcardTerm = flashcardTerm;
        this.flashcardDefinition = flashcardDefinition;
    }

}
