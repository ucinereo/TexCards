export class EditFlashcardRequest {
    id: number;
    term: string;
    definition: string;
    alignment: number;

    constructor(id: number, term: string, definition: string, alignment: number) {
        this.id = id;
        this.term = term;
        this.definition = definition;
        this.alignment = alignment;
    }
}
