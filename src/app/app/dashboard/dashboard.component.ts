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

  public flashcardSets?: FlashcardSet[];

  constructor(private flashcardService: FlashcardService, public router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.flashcardService.getFlashcardSets().subscribe(response => {

      this.flashcardSets = response.data;

    }, (error) => { });
    this.titleService.setTitle("Tex-Cards " + "Flashcard sets")
  }
}
