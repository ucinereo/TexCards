import { TestScheduler } from "rxjs-compat";
import { FlashcardSet } from "./model/flashcard-set";

export enum ViewMode { View, Learn, Star };

export class FlashcardIndexer {

    private orgOrder: number[] = [];
    private viewOrder: number[] = [];
    private learnOrder: number[] = [];
    private starOrder: number[] = [];

    private learnNext: number[] = [];

    length: number = 0;

    private currentIndex: number = -1; // -1 => there are no cards, -2 => all cards have been learned, ready to learn again
    private shuffled: boolean;

    private viewMode: ViewMode = ViewMode.View;

    private flashcardSet!: FlashcardSet;



    constructor() {
        this.setEmpty();
        this.shuffled = false;
    }

    private setEmpty(): void {
        this.orgOrder = [];
        this.viewOrder = [];
        this.learnOrder = [];
        this.starOrder = [];
        this.length = 0;
        this.currentIndex = -1;
    }

    private buildOrders(): void {
        this.orgOrder = Array.from(Array(this.length).keys());
        this.viewOrder = Array.from(Array(this.length).keys());
        this.learnOrder = Array.from(Array(this.length).keys());
        this.starOrder = [];
        this.flashcardSet.stars.forEach(element => this.starOrder.push(element));
    }

    public setFlashcardSet(flashcardSet: FlashcardSet) {
        this.flashcardSet = flashcardSet;
        this.length = flashcardSet.terms.length;
        if (this.length > 0) {
            this.buildOrders();
            this.currentIndex = 0;
        } else {
            this.setEmpty();
        }
        this.shuffled = false;
    }

    public toggleShuffle(): void {
        if (!this.shuffled) {
            this.shuffle();
            this.shuffled = true;
        } else {
            this.sortOrders();
            this.shuffled = false;
        }
    }

    public shuffle(): void {
        this.viewOrder.sort( () => .5 - Math.random() );
        this.learnOrder.sort( () => .5 - Math.random() );
        this.starOrder.sort( () => .5 - Math.random() );
    }

    private sortOrders(): void {
        this.viewOrder = Array.from(Array(this.length).keys());
        this.learnOrder.sort((a, b) => this.orgOrder.indexOf(a) - this.orgOrder.indexOf(b));
        this.starOrder.sort((a, b) => this.orgOrder.indexOf(a) - this.orgOrder.indexOf(b));
    }

    public starUpdate(): void {
        this.starOrder = [];
        this.flashcardSet.stars.forEach(element => this.starOrder.push(element));
        if (this.viewMode == ViewMode.Star) {
            this.currentIndex = this.currentIndex % this.starOrder.length;
        }
    }

    public getIndex(): number {
        if (this.currentIndex >= 0) {
            switch (this.viewMode) {
                case ViewMode.View: return this.viewOrder[this.currentIndex];
                case ViewMode.Learn: return this.learnOrder[this.currentIndex];
                case ViewMode.Star: return this.starOrder[this.currentIndex];
            }
        } else {
            return this.currentIndex;
        }
    }

    public next(): void {
        if (this.length > 0) {
            if (this.viewMode == ViewMode.View) {
                this.currentIndex = (this.currentIndex + 1) % this.length;
            } else if (this.viewMode == ViewMode.Learn) {
                this.learnNext.push(this.learnOrder.shift()!);
                if (this.learnOrder.length == 0) {
                    this.currentIndex = -2;
                }
            } else if (this.viewMode == ViewMode.Star) {
                this.currentIndex = (this.currentIndex + 1) % this.starOrder.length;
            }
        }
    }

    public prev(): void {
        if (this.length > 0) {
            if (this.viewMode == ViewMode.View) {
                this.currentIndex = (this.currentIndex + this.length -1) % this.length;
            } else if (this.viewMode == ViewMode.Learn) {
                this.learnOrder.shift();
                if (this.learnOrder.length == 0) {
                    this.currentIndex = -2;
                }
            } else if (this.viewMode == ViewMode.Star) {
                this.currentIndex = (this.currentIndex + this.length -1) % this.starOrder.length;
            }
        }
    }

    public resetLearnOrder() {
        if (this.length > 0) {
            this.learnOrder = Array.from(Array(this.length).keys());
            this.learnNext = [];
            if (this.shuffled) {
                this.shuffle();
            }
            this.currentIndex = 0;
        } else {
            this.currentIndex = -1;
        }
    }

    public learnMissed(): void {
        this.learnOrder = [];
        this.learnNext.forEach(element => this.learnOrder.push(element));
        this.learnNext = [];
        this.currentIndex = 0;
    }

    public isShuffled(): boolean {
        return this.shuffled;
    }

    public getViewMode(): ViewMode {
        return this.viewMode;
    }

    public setViewMode(mode: ViewMode) {
        if (mode == ViewMode.View) {
            if (this.length > 0) {
                this.currentIndex = 0;
            } else {
                this.currentIndex = -1;
            }
        } else if (mode == ViewMode.Learn) {
            this.resetLearnOrder();
            if (this.length > 0) {
                this.currentIndex = 0;
            } else {
                this.currentIndex = -1;
            }
        } else if (mode == ViewMode.Star) {
            if (this.starOrder.length > 0) {
                this.currentIndex = 0;
            } else {
                this.currentIndex = -1;
            }
        }
        this.viewMode = mode;
    }

    public getMissedCount(): number {
        return this.learnNext.length;
    }

}
