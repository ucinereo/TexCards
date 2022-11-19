import { Flashcard } from "./flashcard";

export class CreateFlashcardSetRequest {
    name: string;
    description: string;
    tags: string[];
    flashcards: Flashcard[];

    constructor (name: string, description: string, tags: string[], flashcards: Flashcard[]) {
        this.name = name;
        this.description = description;
        this.tags = tags;
        this.flashcards = flashcards;
    }
}
