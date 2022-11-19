export class RemoveStarRequest {
    flashcardSet: number;
    flashcard: number;

    constructor(flashcardSet: number, flashcard: number) {
        this.flashcardSet = flashcardSet;
        this.flashcard = flashcard;
    }
}
