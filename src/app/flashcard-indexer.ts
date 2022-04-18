export class FlashcardIndexer {

    private sortedOrder: number[];
    shuffleOrder: number[];

    length: number;

    private currentIndex: number = -1;
    private shuffled: boolean;

    constructor(length: number) {
        if (length > 0) {
            this.sortedOrder = Array.from(Array(length).keys());
            this.shuffleOrder = Array.from(Array(length).keys());
            this.shuffle();
            this.length = length;
            this.currentIndex = 0;
        } else {
            this.sortedOrder = [];
            this.shuffleOrder = [];
            this.length = 0;
        }
        this.shuffled = false;
    }

    public setLength(length: number) {
        if (length > 0) {
            this.sortedOrder = Array.from(Array(length).keys());
            this.shuffleOrder = Array.from(Array(length).keys());
            this.shuffle();
            this.length = length;
            this.currentIndex = 0;
        } else {
            this.sortedOrder = [];
            this.shuffleOrder = [];
            this.length = 0;
        }
    }

    public toggleShuffle(): void {
        if (!this.shuffled) {
            this.shuffle();
            this.shuffled = true;
        } else {
            this.shuffled = false;
        }
    }

    public shuffle(): void {
        this.shuffleOrder.sort( () => .5 - Math.random() );
    }

    public getIndex(): number {
        if (this.currentIndex >= 0) {
            if (this.shuffled) {
                return this.shuffleOrder[this.currentIndex];
            } else {
                return this.sortedOrder[this.currentIndex];
            }
        } else {
            return -1;
        }
    }

    public next(): void {
        if (this.length > 0) {    
            this.currentIndex = (this.currentIndex + 1) % this.length;
        }
    }

    public prev(): void {
        if (this.length > 0) {
            this.currentIndex = (this.currentIndex + this.length -1) % this.length;
        }
    }

}
