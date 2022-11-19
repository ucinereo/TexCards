import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FlashcardService } from '../services/flashcard.service';
import { FlashcardSet } from '../model/flashcard-set';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { FlashcardIndexer, ViewMode } from '../flashcard-indexer';
import { Title } from '@angular/platform-browser';
import * as kf from '../keyframes';

@Component({
  selector: 'app-card-viewer',
  templateUrl: './card-viewer.component.html',
  styleUrls: ['./card-viewer.component.scss'],
  animations: [
    trigger('cardAnimation', [
      transition('default => flipped', animate(300, keyframes(kf.flip))),
      transition('flipped => default', animate(300, keyframes(kf.flipBack))),
      transition('default => next', animate(300, keyframes(kf.fadeOutLeft))),
      transition('default => prev', animate(300, keyframes(kf.fadeOutRight))),
      transition('flipped => next', animate(300, keyframes(kf.fadeOutLeftFlipped))),
      transition('flipped => prev', animate(300, keyframes(kf.fadeOutRightFlipped))),
      transition('default-l => flipped', animate(300, keyframes(kf.flip))),
      transition('flipped-l => default-l', animate(300, keyframes(kf.flipBack))),
      transition('default-l => next-l', animate(300, keyframes(kf.fadeOutLeftL))),
      transition('default-l => prev-l', animate(300, keyframes(kf.fadeOutRightL))),
      transition('flipped-l => next-l', animate(300, keyframes(kf.fadeOutLeftFlippedL))),
      transition('flipped-l => prev-l', animate(300, keyframes(kf.fadeOutRightFlippedL))),
      state('default', style({ transform: 'none' })),
      state('flipped', style({ transform: 'rotateY(180deg)' })),
      state('default-l', style({ transform: 'none' })),
      state('flipped-l', style({ transform: 'rotateY(180deg)' }))
    ])
  ]
})
export class CardViewerComponent implements OnInit {

  @Input() cardState: string = "default"; // default, flipped, next, prev

  public viewModeEnum = ViewMode;

  public flashcardSet?: FlashcardSet;
  public flashcardSetID?: number;

  public flashcardsLoaded: boolean = false;
  
  public flashcardIndexer: FlashcardIndexer;

  constructor(private route: ActivatedRoute, private router: Router, private flashcardService: FlashcardService, private titleService: Title) {
    this.flashcardIndexer = new FlashcardIndexer();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flashcardSetID = params['id'];
      this.flashcardService.getFlashcardSet(this.flashcardSetID!).subscribe(response => {
        this.flashcardSet = response.data;
        this.flashcardsLoaded = true;
        this.flashcardIndexer.setFlashcardSet(this.flashcardSet!);
        this.titleService.setTitle("Tex-Cards " + this.flashcardSet!.flashcardSetName);
      })
    }, (error) => { });
  }

  @HostListener('document:keydown.space')
  flip(): void {
    if (this.flashcardIndexer.getIndex() >= 0) {
      if (this.flashcardIndexer.getViewMode() == ViewMode.Learn) {
        if (this.cardState === "default-l") {
          this.cardState = "flipped-l";
        } else {
          this.cardState = "default-l";
        }
      } else {
        if (this.cardState === "default") {
          this.cardState = "flipped";
        } else {
          this.cardState = "default";
        }
      }
    }
  }

  @HostListener('document:keydown.h')
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
    this.flashcardIndexer.starUpdate();
  }

  onNext() {
    if (this.flashcardIndexer.getViewMode() == ViewMode.Learn) {
      this.cardState = "next-l";
    } else {
      this.cardState = "next";
    }
  }

  onPrev() {
    if (this.flashcardIndexer.getViewMode() == ViewMode.Learn) {
      this.cardState = "prev-l";
    } else {
      this.cardState = "prev";
    }
  }

  resetAnimationState(): void {
    if (this.flashcardIndexer.getViewMode() == ViewMode.Learn) {
      if (this.cardState == 'prev-l') {
        this.flashcardIndexer.prev();
        this.cardState = 'default-l';
      } else if (this.cardState == 'next-l') {
        this.flashcardIndexer.next();
        this.cardState = 'default-l';
      }
    } else {
      if (this.cardState == 'prev') {
        this.flashcardIndexer.prev();
        this.cardState = 'default';
      } else if (this.cardState == 'next') {
        this.flashcardIndexer.next();
        this.cardState = 'default';
      }
    }
  }

  toggleMode(): void {
    let mode = this.flashcardIndexer.getViewMode();
    if (mode == ViewMode.View) {
      this.cardState = "default-l";
      this.flashcardIndexer.setViewMode(ViewMode.Learn);
    } else if (mode == ViewMode.Learn) {
      this.cardState = "default";
      this.flashcardIndexer.setViewMode(ViewMode.Star);
    } else if (mode == ViewMode.Star) {
      this.cardState = "default";
      this.flashcardIndexer.setViewMode(ViewMode.View);
    }
  }

  learnAllAgain(): void {
    setTimeout(() => this.flashcardIndexer.resetLearnOrder(), 5); // handle flip event first
  }

  learnMissedAgain(): void {
    setTimeout(() => this.flashcardIndexer.learnMissed(), 5); // handle flip event first
  }

  @HostListener('document:keydown.arrowright')
  keyNext(): void {
    if (this.flashcardIndexer.getViewMode() == ViewMode.Learn) {
      this.onPrev();
    } else {
      this.onNext();
    }
  }

  @HostListener('document:keydown.arrowleft')
  keyPrev(): void {
    if (this.flashcardIndexer.getViewMode() == ViewMode.Learn) {
      this.onNext();
    } else {
      this.onPrev();
    }
  }

  @HostListener('document:keydown.s')
  toggleShuffle(): void {
    this.flashcardIndexer.toggleShuffle();
  }

  @HostListener('document:keydown.e')
  edit(): void {
    this.router.navigate(['editor/' + this.flashcardSetID]);
  }

}
