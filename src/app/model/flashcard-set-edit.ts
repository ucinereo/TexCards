export enum EditType {Modify, Delete, Add}

export class Card {
    public term: string;
    public definition: string;
    public alignment: number;

    constructor(term: string, definition: string, alignment: number) {
        this.term = term;
        this.definition = definition;
        this.alignment = alignment;
    }
}

export class ModCard {
    public newCard: Card;
    public oldCard: Card;
    public editType: EditType;

    constructor(oldCard: Card, newCard: Card, editType: EditType) {
        this.oldCard = oldCard;
        this.newCard = newCard;
        this.editType = editType;
    }
}

export class FlashcardSetEdit {

    public id: number;
    public flashcardSetName: string;
    public editMap: ModCard[] = [];

    constructor(id: number, name: string) {
        this.id = id;
        this.flashcardSetName = name;
    }

}
