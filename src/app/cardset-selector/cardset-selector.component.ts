import { Component, Input, OnInit } from '@angular/core';
import { FlashcardsSets } from '../model/flashcards-sets';

@Component({
  selector: 'app-cardset-selector',
  templateUrl: './cardset-selector.component.html',
  styleUrls: ['./cardset-selector.component.scss']
})
export class CardsetSelectorComponent implements OnInit {

  @Input() public flashcardsSets?: FlashcardsSets;

  constructor() { }

  ngOnInit(): void {

  }

}
