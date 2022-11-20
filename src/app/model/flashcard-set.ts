import { Flashcard } from "./flashcard";

export class FlashcardSet {

    id: number;
    name: string;
    description: string;
    author: string;
    tags: string[];
    writePermission: boolean;
    owner: boolean;
    lastUsed: number;
  numberOfFlashcards: number;
    flashcards: Flashcard[];

    constructor(id: number, name: string, description: string, author: string, tags: string[], writePermission: boolean, owner: boolean, lastUsed: number, numberOfFlashcards: number, flashcards: Flashcard[] ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.author = author;
        this.tags = tags;
        this.writePermission = writePermission;
        this.owner = owner;
        this.lastUsed = lastUsed;
        this.numberOfFlashcards = numberOfFlashcards;
        this.flashcards = flashcards;
    }


}
