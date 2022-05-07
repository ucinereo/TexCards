import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FlashcardService } from '../services/flashcard.service';
import { FlashcardsSets } from '../model/flashcards-sets';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cardset-selector',
  templateUrl: './cardset-selector.component.html',
  styleUrls: ['./cardset-selector.component.scss']
})
export class CardsetSelectorComponent implements OnInit {

  @ViewChild("newName") newFlashcardSetInput!: ElementRef;

  public flashcardsSets?: FlashcardsSets;

  constructor(private flashcardService: FlashcardService, public router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.flashcardService.getFlashcardsSets().subscribe(response => {
      this.flashcardsSets = response.data;
    }, (error) => { });
    this.titleService.setTitle("Tex-Cards " + "Flashcard sets")
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
