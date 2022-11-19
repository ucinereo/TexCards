
export class Flashcard {
    id: number;
    term: string;
    definition: string;
    alignment: number;
    star: boolean;
    learnState: number;

    constructor( id: number, term: string, definition: string, alignment: number, star: boolean, learnState: number) {
        this.id = id;
        this.term = term;
        this.definition = definition;
        this.alignment = alignment;
        this.star = star;
        this.learnState = learnState;
    }
}
