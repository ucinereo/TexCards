import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FlashcardsSets } from '../model/flashcards-sets';
import { FlashcardService } from '../services/flashcard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public flashcardsSets?: FlashcardsSets;
  public ownFlashcardSets?: FlashcardsSets;

  constructor(private flashcardService: FlashcardService, public router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.flashcardService.getFlashcardsSets().subscribe(response => {
      this.flashcardsSets = response.data;
      this.ownFlashcardSets = new FlashcardsSets();
      this.flashcardsSets!.owner.forEach((element, index) => {
        if (element) {
          this.ownFlashcardSets!.ids.push(this.flashcardsSets!.ids[index]);
          this.ownFlashcardSets!.names.push(this.flashcardsSets!.names[index]);
          this.ownFlashcardSets!.writePermission.push(this.flashcardsSets!.writePermission[index]);
          this.ownFlashcardSets!.owner.push(this.flashcardsSets!.owner[index]);
        }
      });
    }, (error) => { });
    this.titleService.setTitle("Tex-Cards " + "Flashcard sets")
  }


}
