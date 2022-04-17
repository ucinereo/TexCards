import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FlashcardService } from '../services/flashcard.service';
import { FlashcardSet } from '../flashcard-set';
import { trigger, state, style, transition, animate } from '@angular/animations';

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

  public currentCardIndex: number = -1;

  @Input() cardState: string = "default";

  public flashcardSet?: FlashcardSet;
  public flashcardSetID?: number;

  public flashcardsLoaded: boolean = false;
  private length: number = 0;

  constructor(private route: ActivatedRoute, private flashcardService: FlashcardService) {
  
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flashcardSetID = params['id'];
      this.flashcardService.getFlashcardSet(this.flashcardSetID!).subscribe(data => {
        this.flashcardSet = data;
        this.flashcardsLoaded = true;
        this.length = this.flashcardSet.terms.length;
        if (this.length > 0) {
          this.currentCardIndex = 0;
        }
      })
    });
  }

  flip(): void {
    if (this.cardState === "default") {
      this.cardState = "flipped";
    } else {
      this.cardState = "default";
    }
  }

  next(): void {
    this.currentCardIndex = (this.currentCardIndex + 1) % this.length;
  }

  prev(): void {
    this.currentCardIndex = (this.currentCardIndex + this.length -1) % this.length;
  }

}
