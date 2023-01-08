import {Flashcard} from "../../model/flashcard";

export enum ViewMode { View, Learn, Star }

export class CardDealer {

  private readonly orgCards: Flashcard[] = [];

  private currentCards: Flashcard[] = [];
  private learnNextCards: Flashcard[] = [];

  private shuffle: boolean = false;
  private currentViewMode: ViewMode = ViewMode.View;

  constructor(cards?: Flashcard[]) {
    this.orgCards = cards!;
    this.setCardSplit();
  }

  private getInitialCardSplit(): Flashcard[] {
    if (this.currentViewMode == ViewMode.View) {
      return [...this.orgCards];
    } else if (this.currentViewMode == ViewMode.Star) {
      return this.orgCards.filter((card) => card.star);
    } else {
      return [...this.orgCards];
    }
  }

  private shuffleCards(): void {
    for (let i = this.currentCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.currentCards[i];
      this.currentCards[i] = this.currentCards[j];
      this.currentCards[j] = temp;
    }
  }

  private setCardSplit(): void {
    this.currentCards = this.getInitialCardSplit();
    if (this.shuffle) {
      this.shuffleCards();
    }
  }

  public starUpdate(): void {
    this.setCardSplit();
  }

  public moveToMissed(card: Flashcard): void {
    this.learnNextCards.push(card);
  }

  public loadMissedCards(): void {
    this.currentCards = [...this.learnNextCards];
    this.learnNextCards = [];
  }

  public getMissedCardCount(): number {
    return this.learnNextCards.length;
  }

  public setViewMode(mode: ViewMode): void {
    this.currentViewMode = mode;
    this.setCardSplit();
    this.learnNextCards = [];
  }

  public toggleShuffle() {
    this.shuffle = !this.shuffle;
    this.setCardSplit();
  }

  public isShuffle(): boolean {
    return this.shuffle;
  }

  public getCurrentCards(): Flashcard[] {
    return this.currentCards;
  }

  public getViewMode(): ViewMode {
    return this.currentViewMode;
  }

}
