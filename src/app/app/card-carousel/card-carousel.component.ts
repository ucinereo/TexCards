import { Component, Input, OnInit, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Flashcard } from 'src/app/model/flashcard';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {CardFlipperComponent} from "../card-flipper/card-flipper.component";

/*
  The component consists of 3 'app-card-flipper' items (previous/current/next)
  After a rotation the 3 card flippers get their new values.
  The method used to provide a seamless transition:
    - Left Rotation: current/next move to left and change their opacities
    - Update the contents on each cards
    - Turn them back (instantly)

  After the rotation, the current card ist still the current card, but with the
  new content.

  If a card is flipped to its definition, it gets flipped back instantaneous.
*/
@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.scss'],
  animations: [
    trigger('current', [ // Animations for the current card
      state('idle', style({
        transform: 'translateX(0)',
        opacity: '1'
      })),
      state('right', style({
        transform: 'translateX(100%)',
        opacity: '0'
      })),
      state('left', style({
        transform: 'translateX(-100%)',
        opacity: '0'
      })),
      transition('idle => right', animate('400ms ease-out')),
      transition('idle => left', animate('400ms ease-out')),
      transition('right => idle', animate('0ms ease-out')),
      transition('left => idle', animate('0ms ease-out')),
    ]),
    trigger('previous', [ // Animations for the card on the left
      state('idle', style({
        transform: 'translate(-100%)',
        opacity: '0'
      })),
      state('left', style({
        transform: 'translate(-100%)',
        opacity: '0'
      })),
      state('right', style({
        transform: 'translateX(0px)',
        opacity: '1'
      })),
      transition('idle => right', animate('400ms ease-out')),
      transition('right => idle', animate('0ms ease-out')),
    ]),
    trigger('next', [ // Animations for the card on the right
      state('idle', style({
        transform: 'translate(100%)',
        opacity: '0'
      })),
      state('right', style({
        transform: 'translate(100%)',
        opacity: '0'
      })),
      state('left', style({
        transform: 'translateX(0px)',
        opacity: '1'
      })),
      transition('idle => left', animate('400ms ease-out')),
      transition('left => idle', animate('0ms ease-out')),
    ])
  ]
})
export class CardCarouselComponent implements OnInit {

  @ViewChild("currentCard") currentCard?: CardFlipperComponent;

  @Input("learnMode") learnMode: boolean = false;
  @Output("allDone") allDone: EventEmitter<any> = new EventEmitter<any>();

  public _cards?: Flashcard[];

  public position: string = 'idle';

  // Terms and definitions of the three cards
  public current_term: string = 'term current';
  public current_def: string = 'definition current';
  public previous_term: string = 'term previous';
  public previous_def: string = 'definition previous';
  public next_term: string = 'term next';
  public next_def: string = 'definition next';


  private current: number = 0;
  private numOfCards!: number;

  constructor(private _ref: ChangeDetectorRef) {

  }

  @Input() set cards(value: Flashcard[] | undefined) {
    if (value) {
      if (value.length == 0) {
        this._cards = undefined;
        this.numOfCards = 0;
        this.current = 0;
        this.resetTermsDefs()
      } else {
        this._cards = value;
        this.numOfCards = value.length;
        if (this.current >= this.numOfCards) {
          this.current = this.current % this.numOfCards;
        }
        this.updateCards();
      }
    }
  }

  ngOnInit(): void {  }

  private resetTermsDefs(): void {
    this.current_term = 'term current';
    this.current_def = 'definition current';
    this.previous_term = 'term previous';
    this.previous_def = 'definition previous';
    this.next_term = 'term next';
    this.next_def = 'definition next';
  }

  public resetIndex(): void {
    this.current = 0;
    this.updateCards();
  }

  public getIndex() {
    return this.current;
  }

  public getCurrentCard() {
    if (0 <= this.current && this.current < this.numOfCards) {
      return this._cards![this.current];
    } else {
      return null;
    }
  }

  /*
  returns true if action is executed
  */
  public rotateRight(): boolean {
    if (this.position != 'idle' || this.numOfCards == 0) { return false; }
    if (!this.learnMode) {
      this.current--;
      if (this.current < 0) { this.current += this.numOfCards; }
    } else {
      this.current++;
      if (this.current >= this.numOfCards) {
        this.allDone.emit();
      }
    }
    this.position = 'right';
    this._ref.detectChanges();
    return true;
  }

  /*
  returns true if action is executed
  */
  public rotateLeft(): boolean {
    if (this.position != 'idle' || this.numOfCards == 0) { return false; }
    if (!this.learnMode) {
      this.current++;
      if (this.current >= this.numOfCards) { this.current -= this.numOfCards; }
    } else {
      this.current++;
      if (this.current >= this.numOfCards) {
        this.allDone.emit();
      }
    }
    this.position = 'left';
    this._ref.detectChanges();
    return true;
  }

  public flip(): void {
    this.currentCard?.flip();
  }

  public updateCards(): void {
    if (!this.learnMode) {
      this.current_term = this.getTerm(this.current);
      this.current_def = this.getDef(this.current);
      this.previous_term = this.getTerm(this.current - 1 );
      this.previous_def = this.getDef(this.current - 1);
      this.next_term = this.getTerm(this.current + 1 );
      this.next_def = this.getDef(this.current + 1);
    } else {
      this.current_term = this.getTerm(this.current);
      this.current_def = this.getDef(this.current);
      this.previous_term = this.getTerm(this.current + 1 );
      this.previous_def = this.getDef(this.current + 1);
      this.next_term = this.getTerm(this.current + 1 );
      this.next_def = this.getDef(this.current + 1);
    }
  }

  private getDef(i: number): string {
    if (i < 0) { i += this.numOfCards; }
    else if (i >= this.numOfCards) { i -= this.numOfCards; }
    return this._cards![i % this.numOfCards].definition;
  }

  private getTerm(i: number): string {
    if (i < 0) { i += this.numOfCards; }
    else if (i >= this.numOfCards) { i -= this.numOfCards; }
    return this._cards![i % this.numOfCards].term;
  }

  // Update the contents of the cards
  public resetCurrent(): void {
    if (this.position == 'idle') { return; }
    this.updateCards();
    this.currentCard?.reset();
    this.position = 'idle';
  }
}
