import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FlashcardService } from '../services/flashcard.service';
import { FlashcardsSets } from '../flashcards-sets';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardset-selector',
  templateUrl: './cardset-selector.component.html',
  styleUrls: ['./cardset-selector.component.scss']
})
export class CardsetSelectorComponent implements OnInit {

  @ViewChild("newName") newFlashcardSetInput!: ElementRef;

  public flashcardsSets?: FlashcardsSets;

  constructor(private flashcardService: FlashcardService, private router: Router) { }

  ngOnInit(): void {
    this.flashcardService.getFlashcardsSets().subscribe(response => {
      this.flashcardsSets = response.data;
    }, (error) => { });
  }

  openNewFlashcardSetDialog(): void {
    this.newFlashcardSetInput.nativeElement.focus();
  }

  createNewFlashcardSet(): void {
    if (this.newFlashcardSetInput.nativeElement.value.length > 0) {
      this.flashcardService.createNewFlashcardSet(this.newFlashcardSetInput.nativeElement.value).subscribe(response => {
        this.router.navigate(['editor/' + response.data]);
      }, (error) => { });
    }
  }

}
