import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardSet } from '../../model/flashcard-set';
import { Card, EditType, FlashcardSetEdit, ModCard } from '../../model/flashcard-set-edit';
import { FlashcardService } from '../../services/flashcard.service';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { ErrorViewComponent } from '../../error-view/error-view.component';

@Component({
  selector: 'app-cardset-editor',
  templateUrl: './cardset-editor.component.html',
  styleUrls: ['./cardset-editor.component.scss']
})
export class CardsetEditorComponent implements OnInit {

  private static previewDelay = 500;

  @ViewChildren("tSpans") tSpans!: QueryList<ElementRef>;
  @ViewChildren("dSpans") dSpans!: QueryList<ElementRef>;
  @ViewChild("name") flashcardSetNameInput!: ElementRef;

  public terms: string[] = [""];
  public definitions: string[] = [""];
  public alignment: number[] = [2];

  public deletedCardsTerms: string[] = [];
  public deletedCardsDefinitions: string[] = [];
  public deleteHistory: number[] = [];

  public count: number = 1;
  public focusIndex: number = -1;
  public previewIndex: number = -1;
  public termFocus: boolean = true;

  public flashcardSet?: FlashcardSet;
  public flashcardSetID?: number;

  constructor(private route: ActivatedRoute, private router: Router, private flashcardService: FlashcardService, private titleService: Title) {

   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flashcardSetID = params['id'];
      this.flashcardService.getFlashcardSet(this.flashcardSetID!).subscribe(response => {
        // this.flashcardSet = response.data;
        // this.count = this.flashcardSet!.terms.length + 1;
        // this.terms = [... this.flashcardSet!.terms];
        // this.definitions = [... this.flashcardSet!.definitions];
        // this.alignment = [... this.flashcardSet!.alignment];
        // this.terms.push("");
        // this.definitions.push("");
        // this.alignment.push(2);
        // this.titleService.setTitle("Tex-Cards " + this.flashcardSet!.flashcardSetName);
        setTimeout(() => this.setupData(), 5);
      }, (error) => { })
    });
  }

  setupData(): void {
    for (var i = 0; i < this.count -1; i++) {
      this.tSpans.get(i)!.nativeElement.innerText = this.terms[i];
      this.dSpans.get(i)!.nativeElement.innerText = this.definitions[i];
    }
  }

  onPaste(e: any): void {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand("insertText", false, text);

  }

  @HostListener('document:keydown.control.s')
  submit(): void {
    let flashcardSetEdit = this.buildRequestModel();

    this.flashcardService.editFlashcardSet(flashcardSetEdit).subscribe(response => {
      if (response.data) {
        this.router.navigate(['cards/' + this.flashcardSet!.id]);
      }
    }, (error) => {
      let errorCode = error.status;
      let errorMsg = error.error.message;
      if (errorMsg == undefined || errorMsg == null || errorMsg == "" || errorMsg.includes('/') || errorMsg.includes('.')) {
        errorMsg = "-";
      }
      if (errorCode == undefined || errorCode == null || errorCode == "") {
        errorCode = "500";
      }

      // this.dialog.open(ErrorDialogComponent, {
      //   data: {
      //     status: errorCode,
      //     title: ErrorViewComponent.getErrorTitle(errorCode),
      //     msg: errorMsg
      //   }
      // });
    });
  }

  counter(i: number): number[] {
    return new Array(i);
  }

  update(trigger: number, e: any, isTerm: boolean): void {
    this.terms = this.tSpans.map((span: ElementRef) => span.nativeElement.innerText);
    this.definitions = this.dSpans.map((span: ElementRef) => span.nativeElement.innerText);

    if (trigger == this.count -1 && (this.terms[trigger].length != 0 || this.definitions[trigger].length != 0)) {
      this.terms.push("");
      this.definitions.push("");
      this.alignment.push(2);
      this.count++;
    }
  }

  setAlignment(index: number, align: number): void {
    this.alignment[index] = align;
  }

  onFocusOut(index: number): void {
    this.focusIndex = -1;
    setTimeout(() => {
      if (this.focusIndex != this.previewIndex) {
        this.previewIndex = -1
      }
    }, CardsetEditorComponent.previewDelay);
    setTimeout(() => this.checkForEmpty(index), 5); // TODO clean up, i think this isn't guaranteed to work
  }

  onFocusIn(index: number, termFocus: boolean): void {
    this.previewIndex = index;
    this.focusIndex = index;
    this.termFocus = termFocus;
  }

  checkForEmpty(index: number): void {
    if (index != this.count -1 && index < this.terms.length && this.focusIndex != index && this.terms[index].length == 0 && this.definitions[index].length == 0) {
      this.removeItem(index);
      if (this.focusIndex > index) {
        if (this.termFocus) {
          this.tSpans.get(index)?.nativeElement.focus();
        } else {
          this.dSpans.get(index)?.nativeElement.focus();
        }
      }
    }
  }

  removeItem(index: number): void {
    if (index != this.count -1){
      for (var i = index; i < this.tSpans.length -1; i++) {
        this.dSpans.get(i)!.nativeElement.innerText = this.dSpans.get(i+1)?.nativeElement.innerText;
        this.tSpans.get(i)!.nativeElement.innerText = this.tSpans.get(i+1)?.nativeElement.innerText;
      }
      this.terms.splice(index, 1);
      this.definitions.splice(index, 1);
      this.alignment.splice(index, 1);
      this.count--;
      this.deleteHistory.push(index);
    }
  }

  deleteFlashcardSet(): void {
    this.flashcardService.deleteFlashcardSet(this.flashcardSet!).subscribe(response => {
      if (response.data) {
        this.router.navigate(['']);
      }
    }, (error) => { });
  }

  private calculateDeleteIndecies(): number[] {
    let ind: number[] = [];
    this.deleteHistory.forEach((element, index) => {
      let org = element;
      for (let i = index -1; i >= 0; i--) {
        if (org >= this.deleteHistory[i]) {
          org++;
        }
      }
      //if (org < this.flashcardSet!.terms.length) {
      //  ind.push(org);
      //}
    });
    return ind;
  }

  private buildRequestModel(): FlashcardSetEdit {
    let deleteInd = this.calculateDeleteIndecies();

    let flashcardSetEdit = new FlashcardSetEdit(this.flashcardSet!.id, this.flashcardSetNameInput.nativeElement.value);
    //let cardCounter = 0; // counts how many cards of the displayed list have been processed
    //for (let i = 0; i < this.flashcardSet!.terms.length; i++) {
    //  if (deleteInd.includes(i)) { // delete
    //    let card = new Card(this.flashcardSet!.terms[i], this.flashcardSet!.definitions[i], this.flashcardSet!.alignment[i]);
    //    flashcardSetEdit.editMap.push(new ModCard(card, card,  EditType.Delete));
    //  } else { // modify
    //    let oldCard = new Card(this.flashcardSet!.terms[i], this.flashcardSet!.definitions[i], this.flashcardSet!.alignment[i]);
    //    let newCard = new Card(this.terms[cardCounter], this.definitions[cardCounter], this.alignment[cardCounter]);
    //    cardCounter++;
    //    flashcardSetEdit.editMap.push(new ModCard(oldCard, newCard, EditType.Modify));
    //  }
    //}
    //for (let i = cardCounter; i < this.terms.length -1; i++) { // add
    //  let card = new Card(this.terms[i], this.definitions[i], this.alignment[i]);
    //  flashcardSetEdit.editMap.push(new ModCard(new Card("", "", 0), card, EditType.Add));
    //}

    return flashcardSetEdit;

  }

}
