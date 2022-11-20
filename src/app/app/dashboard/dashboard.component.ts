import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FlashcardsSets } from '../../model/flashcards-sets';
import { FlashcardService } from '../../services/flashcard.service';
import { CardsetCreationDialogComponent, CreationType } from '../cardset-creation-dialog/cardset-creation-dialog.component';
import {FlashcardSet} from "../../model/flashcard-set";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public flashcardSets: FlashcardSet[] = [];

  public recentlyStudied: FlashcardSet[][] = [];

  constructor(private flashcardService: FlashcardService, public router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.flashcardService.getFlashcardSets().subscribe(response => {

      this.flashcardSets = response.data;
      this.recentlyStudied = this.reshapeToColStructure(this.flashcardSets.sort((n1, n2) => n1.lastUsed - n2.lastUsed).slice(0, 4));

    }, (error) => { });
    this.titleService.setTitle("Tex-Cards " + "Flashcard sets")
  }

  private reshapeToColStructure(flashcardSets: FlashcardSet[]) {
    const innerSize = 2;
    let reshaped: FlashcardSet[][] = [];
    for (let i = 0; (i + innerSize) < flashcardSets.length + 2; i += innerSize) {
      reshaped.push(flashcardSets.slice(i, i + innerSize));
    }
    return reshaped;
  }
}
