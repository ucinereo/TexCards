import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FlashcardService } from '../../services/flashcard.service';
import {FlashcardSet} from "../../model/flashcard-set";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public searchTerm: string = "";

  public flashcardSets: FlashcardSet[] = [];

  public recentlyStudied: FlashcardSet[][] = [];
  public filteredFlashcardSets: FlashcardSet[][] = [];

  constructor(private flashcardService: FlashcardService, public router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.flashcardService.getFlashcardSets().subscribe(response => {

      this.flashcardSets = response.data;
      this.recentlyStudied = this.reshapeToColStructure(this.flashcardSets.sort((n1, n2) => n2.lastUsed - n1.lastUsed).slice(0, 4));
      this.filteredFlashcardSets = this.reshapeToColStructure(this.flashcardSets);

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

  public applyFilter() {
    this.filteredFlashcardSets = this.reshapeToColStructure(this.flashcardSets.filter((set: FlashcardSet) => {
      return set.name.toLowerCase().includes(this.searchTerm) || set.description.toLowerCase().includes(this.searchTerm) || set.author.toLowerCase().includes(this.searchTerm) || set.tags.filter((tag) => tag.toLowerCase().includes(this.searchTerm)).length > 0;
    }))
  }
}
