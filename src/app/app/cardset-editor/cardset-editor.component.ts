import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardSet } from '../../model/flashcard-set';
import { FlashcardService } from '../../services/flashcard.service';
import {Flashcard} from "../../model/flashcard";

@Component({
  selector: 'app-cardset-editor',
  templateUrl: './cardset-editor.component.html',
  styleUrls: ['./cardset-editor.component.scss']
})
export class CardsetEditorComponent implements OnInit {

  private static previewDelay = 500;

  public flashcardSet?: FlashcardSet;
  public flashcardSetID?: number;

  public flashcardSetName: string = "";
  public flashcardSetDescription: string = "";

  public flashcardList: EditFlashcard[] = [];

  public removedList: Flashcard[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private flashcardService: FlashcardService, private titleService: Title) {

   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flashcardSetID = params['id'];
      this.flashcardService.getFlashcardSet(this.flashcardSetID!).subscribe(response => {
        this.flashcardSet = response.data;
        this.flashcardSetName = this.flashcardSet?.name!;
        this.flashcardSetDescription = this.flashcardSet?.description!;

        this.flashcardSet?.flashcards.forEach(item => this.flashcardList.push(new EditFlashcard(item)));
        this.flashcardList.push(EditFlashcard.createEmpty());
      })
    });
  }



  onPaste(e: any): void {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand("insertText", false, text);
  }


  public onChange(index: number) {
    // check if it is the last card, if so add a new one
    if (index == this.flashcardList.length -1) {
      this.flashcardList.push(EditFlashcard.createEmpty());
    }
  }




}
enum EditType {
  Modified,
  New
}

class EditFlashcard extends Flashcard {

  editType: EditType = EditType.New;

  static createEmpty() {
    return new EditFlashcard(new Flashcard(-1, "", "", 0, false, 0));
  }

  constructor(flashcard: Flashcard) {
    super(flashcard.id, flashcard.term, flashcard.definition, flashcard.alignment, flashcard.star, flashcard.learnState);
  }

}
