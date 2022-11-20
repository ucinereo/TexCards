import {Component, Input, OnInit} from '@angular/core';
import {FlashcardSet} from "../../model/flashcard-set";

@Component({
  selector: 'app-flashcardset-summary',
  templateUrl: './flashcardset-summary.component.html',
  styleUrls: ['./flashcardset-summary.component.scss']
})
export class FlashcardsetSummaryComponent implements OnInit {

  @Input() flashcardSet!: FlashcardSet;

  constructor() { }

  ngOnInit(): void {
  }

}
