import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashcardService} from '../../services/flashcard.service';
import {FlashcardSet} from '../../model/flashcard-set';
import {Title} from '@angular/platform-browser';
import {CardDealer, ViewMode} from "./card-dealer";
import {Flashcard} from "../../model/flashcard";
import {CardCarouselComponent} from "../card-carousel/card-carousel.component";
import {AddStarRequest} from "../../model/add-star-request";
import {RemoveStarRequest} from "../../model/remove-star-request";

@Component({
  selector: 'app-card-viewer',
  templateUrl: './card-viewer.component.html',
  styleUrls: ['./card-viewer.component.scss'],
})
export class CardViewerComponent implements OnInit {

  @ViewChild("carousel") carousel?: CardCarouselComponent;

  public viewModeEnum = ViewMode;

  public flashcardSet?: FlashcardSet;
  public flashcardSetID?: number;

  public showAllDone: boolean = false;

  public cardDealer: CardDealer;

  public cardSplit: Flashcard[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private flashcardService: FlashcardService, private titleService: Title) {
    this.cardDealer = new CardDealer([]);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flashcardSetID = params['id'];
      this.flashcardService.getFlashcardSet(this.flashcardSetID!).subscribe(response => {
        this.flashcardSet = response.data;
        this.titleService.setTitle("Tex-Cards " + this.flashcardSet!.name);
        this.cardDealer = new CardDealer(this.flashcardSet?.flashcards);
        this.reloadCardSplit();
      })
    });
  }

  @HostListener('document:keydown.space', ['$event'])
  flip(event: KeyboardEvent): void {
    event.preventDefault();
    this.carousel?.flip();
  }

  @HostListener('document:keydown.h')
  toggleStar(): void {
    const card = this.carousel?.getCurrentCard();
    if (card) {
      if (card.star) {
        let request = new RemoveStarRequest(this.flashcardSetID!, card.id);
        this.flashcardService.removeFlashcardStar(request).subscribe( response => {
          card.star = false;
          if (this.cardDealer.getViewMode() == ViewMode.Star) {
            this.cardDealer.starUpdate();
            this.reloadCardSplit();
          }
        });
      } else {
        let request = new AddStarRequest(this.flashcardSetID!, card.id);
        this.flashcardService.addFlashcardStar(request).subscribe(response => {
          card.star = true;
        });
      }
    }
  }

  public hasStar(): boolean {
    if (this.carousel && this.carousel.getCurrentCard()) {
      return this.carousel.getCurrentCard()!.star;
    } else {
      return  false;
    }
  }

  toggleMode(): void {
    if (this.cardDealer.getViewMode() == ViewMode.View) {
      this.cardDealer.setViewMode(ViewMode.Learn);
      this.carousel?.resetIndex();
    } else if (this.cardDealer.getViewMode() == ViewMode.Learn) {
      this.cardDealer.setViewMode(ViewMode.Star);
    } else if (this.cardDealer.getViewMode() == ViewMode.Star) {
      this.cardDealer.setViewMode(ViewMode.View);
    }
    this.reloadCardSplit();
  }

  public allDone(): void {
    this.showAllDone = true;
  }

  public learnAllAgain(): void {
    this.cardDealer.setViewMode(ViewMode.Learn);
    this.carousel?.resetIndex();
    this.showAllDone = false;
  }

  public learnMissedAgain(): void {
    this.cardDealer.loadMissedCards();
    this.reloadCardSplit();
    this.carousel?.resetIndex();
    this.showAllDone = false;
  }

  public returnToCards(): void {
    this.cardDealer.setViewMode(ViewMode.View);
    this.reloadCardSplit();
    this.carousel?.resetIndex();
    this.showAllDone = false;
  }

  private reloadCardSplit(): void {
    this.cardSplit = this.cardDealer.getCurrentCards();
  }

  @HostListener('document:keydown.arrowright')
  next(): void {
    if (this.cardDealer.getViewMode() == ViewMode.Learn) {
      this.carousel?.rotateRight();
    } else {
      this.carousel?.rotateLeft();
    }
  }

  @HostListener('document:keydown.arrowleft')
  prev(): void {
    if (this.cardDealer.getViewMode() == ViewMode.Learn) {
      this.cardDealer.moveToMissed(this.carousel?.getCurrentCard()!);
      this.carousel?.rotateLeft();
    } else {
      this.carousel?.rotateRight();
    }
  }

  @HostListener('document:keydown.s')
  toggleShuffle(): void {
    this.cardDealer.toggleShuffle();
    this.reloadCardSplit();
  }

  @HostListener('document:keydown.e')
  edit(): void {
    this.router.navigate(['editor/' + this.flashcardSetID]);
  }

}
