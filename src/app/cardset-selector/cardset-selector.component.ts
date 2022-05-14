import { Component, ElementRef, Host, HostListener, OnInit, ViewChild } from '@angular/core';
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

  public dialogOpen: boolean = false;

  public flashcardsSets?: FlashcardsSets;

  constructor(private flashcardService: FlashcardService, public router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.flashcardService.getFlashcardsSets().subscribe(response => {
      this.flashcardsSets = response.data;
    }, (error) => { });
    this.titleService.setTitle("Tex-Cards " + "Flashcard sets")
  }

  @HostListener('document:keydown.esc', ['$event'])
  @HostListener('document:keydown.a', ['$event'])
  toggleNewFlashcardSetDialog(event: any): void {
    if (!this.dialogOpen && (!event || event.key != 'Escape')) {
      setTimeout(() => {
        this.dialogOpen = true;
        this.newFlashcardSetInput.nativeElement.focus();
      }, 5);
    } else if (event.key != 'a' || !event) {
      this.newFlashcardSetInput.nativeElement.blur();
      this.dialogOpen = false;
    }
  }

  @HostListener('document:keydown.enter')
  createNewFlashcardSet(): void {
    if (this.newFlashcardSetInput.nativeElement.value.length > 0) {
      this.flashcardService.createNewFlashcardSet(this.newFlashcardSetInput.nativeElement.value).subscribe(response => {
        this.router.navigate(['editor/' + response.data]);
      }, (error) => { });
    }
  }


}
