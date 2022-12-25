import {Component, OnInit, ViewChild} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FlashcardSet } from '../../model/flashcard-set';
import { FlashcardService } from '../../services/flashcard.service';
import {CardCarouselComponent} from "../card-carousel/card-carousel.component";

@Component({
  selector: 'app-cardset-overview',
  templateUrl: './cardset-overview.component.html',
  styleUrls: ['./cardset-overview.component.scss']
})
export class CardsetOverviewComponent implements OnInit {

  @ViewChild(CardCarouselComponent) carousel?: CardCarouselComponent;

  public flashcardSet: FlashcardSet | undefined;
  public flashcardSetID!: number;

  constructor(private flashcardService: FlashcardService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flashcardSetID = params['id'];
      this.flashcardService.getFlashcardSet(this.flashcardSetID).subscribe(response => {
        this.flashcardSet = response.data;
        //this.titleService.setTitle("Tex-Cards " + this.flashcardSet!.flashcardSetName);
      }, error => {});
    });
  }

}
