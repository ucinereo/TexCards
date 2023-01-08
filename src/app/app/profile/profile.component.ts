import {Component, OnInit} from '@angular/core';
import {FlashcardService} from "../../services/flashcard.service";
import {FlashcardSet} from "../../model/flashcard-set";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public ownFlashcardSets: FlashcardSet[] = [];
  public username: string = "";
  public email: string = "";

  constructor(private flashcardService: FlashcardService) {
  }

  ngOnInit() {
    this.flashcardService.getFlashcardSets().subscribe(response => {
      const sets: FlashcardSet[] = response.data;
      this.ownFlashcardSets = sets.filter(set => set.owner);
    });
    this.username = localStorage.getItem("username")!;
    this.email = localStorage.getItem("email")!;
  }

}
