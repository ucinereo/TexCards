import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FlashcardService } from '../services/flashcard.service';
import { FlashcardSet } from '../flashcard-set';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FlashcardIndexer } from '../flashcard-indexer';

@Component({
  selector: 'app-card-viewer',
  templateUrl: './card-viewer.component.html',
  styleUrls: ['./card-viewer.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none'
      })),
      state('flipped', style({
        transform: 'rotateY(180deg)'
      })),
      transition('default => flipped', [
        animate('300ms')
      ]),
      transition('flipped => default', [
        animate('300ms')
      ])
    ])
  ]
})
export class CardViewerComponent implements OnInit {

  @Input() cardState: string = "default";

  public flashcardSet?: FlashcardSet;
  public flashcardSetID?: number;

  public flashcardsLoaded: boolean = false;
  
  public flashcardIndexer: FlashcardIndexer;

  constructor(private route: ActivatedRoute, private flashcardService: FlashcardService) {
    this.flashcardIndexer = new FlashcardIndexer(0);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flashcardSetID = params['id'];
      this.flashcardService.getFlashcardSet(this.flashcardSetID!).subscribe(response => {
        this.flashcardSet = response.data;
        this.flashcardsLoaded = true;
        this.flashcardIndexer.setLength(this.flashcardSet!.terms.length)
      })
    }, (error) => { });
  }

  flip(): void {
    if (this.cardState === "default") {
      this.cardState = "flipped";
    } else {
      this.cardState = "default";
    }
  }

  toggleStar(): void {
    let index = this.flashcardIndexer.getIndex();
    if (this.flashcardSet!.stars.includes(index)) {
      this.flashcardService.removeFlashcardStar(this.flashcardSet!.id, this.flashcardSet!.terms[this.flashcardIndexer.getIndex()], this.flashcardSet!.definitions[this.flashcardIndexer.getIndex()]).subscribe(response => {
        }, (error) => { });
      this.flashcardSet!.stars.splice(this.flashcardSet!.stars.indexOf(index), 1);
    } else {
      this.flashcardService.addFlashcardStar(this.flashcardSet!.id, this.flashcardSet!.terms[this.flashcardIndexer.getIndex()], this.flashcardSet!.definitions[this.flashcardIndexer.getIndex()]).subscribe(data => {
        }, (error) => { });
      this.flashcardSet!.stars.push(index);
    }
  }

}
