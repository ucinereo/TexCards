import { Component, Input, HostListener, OnInit } from '@angular/core';
import { Flashcard } from 'src/app/model/flashcard';
import { FlashcardSet } from 'src/app/model/flashcard-set';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
        transform: 'translateX(520px)',
        opacity: '0'
      })),
      state('left', style({
        transform: 'translateX(-520px)',
        opacity: '0'
      })),
      transition('idle => right', animate('400ms ease-out')),
      transition('idle => left', animate('400ms ease-out')),
      transition('right => idle', animate('0ms ease-out')),
      transition('left => idle', animate('0ms ease-out')),
    ]),
    trigger('previous', [ // Animations for the card on the left
      state('idle', style({
        transform: 'translate(-520px)',
        opacity: '0'
      })),
      state('left', style({
        transform: 'translate(-520px)',
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
        transform: 'translate(520px)',
        opacity: '0'
      })),
      state('right', style({
        transform: 'translate(520px)',
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

  @Input() cards: FlashcardSet;

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

  constructor() {
    // TODO: Remove template card sets
    let flashcards: Flashcard[] = [
      new Flashcard(1, "term1", "definition1", 0, false, 1),
      new Flashcard(2, "term2", "definition2", 0, false, 1),
      new Flashcard(3, "term3", "definition3", 0, false, 1),
      new Flashcard(4, "term4", "definition4", 0, false, 1),
      new Flashcard(5, "term5", "definition5", 0, false, 1),
      new Flashcard(6, "term6", "definition6", 0, false, 1)
    ];
    this.cards = new FlashcardSet(1, "set name", "desc.", "the almighty ucinereo",
                                  ["tag1"], true, true, 0, 6, flashcards);
    this.numOfCards = 6;

    this.updateCards();
  }

  ngOnInit(): void {  }

  // TODO: Create event
  @HostListener('document:keydown.arrowRight')
  public rotateRight():void {
    console.log('transition1');
    this.current--;
    if (this.current < 0) { this.current += this.numOfCards; }
    this.position = 'right';
  }

  // TODO: Create event
  @HostListener('document:keydown.arrowleft')
  public rotateLeft():void {
    console.log('transition2');
    this.current++;
    if (this.current >= this.numOfCards) { this.current -= this.numOfCards; }
    this.position = 'left';
  }

  private updateCards(): void {
    this.current_term = this.getTerm(this.current);
    this.current_def = this.getDef(this.current);
    this.previous_term = this.getTerm(this.current - 1 );
    this.previous_def = this.getDef(this.current - 1);
    this.next_term = this.getTerm(this.current + 1 );
    this.next_def = this.getDef(this.current + 1);
  }

  private getDef(i: number): string {
    if (i < 0) { i += this.numOfCards; }
    else if (i >= this.numOfCards) { i -= this.numOfCards; }
    return this.cards.flashcards[i % this.numOfCards].definition;
  }

  private getTerm(i: number): string {
    if (i < 0) { i += this.numOfCards; }
    else if (i >= this.numOfCards) { i -= this.numOfCards; }
    return this.cards.flashcards[i % this.numOfCards].term;
  }

  // Update the contents of the cards
  public resetCurrent(): void {
    if (this.position == 'idle') return;
    this.updateCards();
    this.position = 'idle';
  }
}
