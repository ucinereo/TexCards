import { Flashcard } from "./flashcard"

export class EditFlashcardSetRequest {
    id: number;
    name: string;
    description: string;
    newTags: string[];
    removedTags: string[];
    editedFlashcards: Flashcard[];
    newFlashcards: Flashcard[];
    removedFlashcards: Flashcard[];

    constructor(id: number, name: string, description: string, newTags: string[], removedTags: string[], editedFlashcards: Flashcard[], newFlashcards: Flashcard[], removedFlashcards: Flashcard[] ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.newTags = newTags;
        this.removedTags = removedTags;
        this.editedFlashcards = editedFlashcards;
        this.newFlashcards = newFlashcards;
        this.removedFlashcards = removedFlashcards;
    }
}
