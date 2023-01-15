import {Component, Input} from '@angular/core';
import {FlashcardSet} from "../../model/flashcard-set";

@Component({
  selector: 'app-flashcardset-summary-list',
  templateUrl: './flashcardset-summary-list.component.html',
  styleUrls: ['./flashcardset-summary-list.component.scss']
})
export class FlashcardsetSummaryListComponent {

  private _flashcardSets: FlashcardSet[] = [];

  public filteredFlashcardSets: FlashcardSet[][] = [];
  public searchTerm: string = "";

  @Input() set flashcardSets(sets: FlashcardSet[]) {
    this._flashcardSets = sets;
    this.filteredFlashcardSets = this.reshapeToColStructure(this._flashcardSets);
  }

  private reshapeToColStructure(flashcardSets: FlashcardSet[]) {
    const innerSize = 2;
    let reshaped: FlashcardSet[][] = [];
    for (let i = 0; (i + innerSize) < flashcardSets.length + 2; i += innerSize) {
      reshaped.push(flashcardSets.slice(i, i + innerSize));
    }
    return reshaped;
  }

  public applyFilter() {
    const searchTerm = this.searchTerm.toLowerCase();
    this.filteredFlashcardSets = this.reshapeToColStructure(this._flashcardSets.filter((set: FlashcardSet) => {
      return set.name.toLowerCase().includes(searchTerm) || set.description?.toLowerCase().includes(searchTerm) || set.author.toLowerCase().includes(searchTerm) || set.tags!.filter((tag) => tag.toLowerCase().includes(searchTerm)).length > 0;
    }));
  }


}
