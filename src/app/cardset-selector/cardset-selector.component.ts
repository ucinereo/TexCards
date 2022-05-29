import { Component, ElementRef, Host, HostListener, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FlashcardService } from '../services/flashcard.service';
import { FlashcardsSets } from '../model/flashcards-sets';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogState, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardsetCreationDialogComponent } from '../dashboard/cardset-creation-dialog/cardset-creation-dialog.component';

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
