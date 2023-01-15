import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardSet } from '../../model/flashcard-set';
import { FlashcardService } from '../../services/flashcard.service';
import {Flashcard} from "../../model/flashcard";
import {EditFlashcardSetRequest} from "../../model/edit-flashcard-set-request";
import {CreateFlashcardSetRequest} from "../../model/create-flashcard-set-request";
import {DeleteFlashcardSetRequest} from "../../model/delete-flashcard-set-request";
import {FormControl, UntypedFormControl, UntypedFormGroup} from "@angular/forms";

declare var window: any;

@Component({
  selector: 'app-cardset-editor',
  templateUrl: './cardset-editor.component.html',
  styleUrls: ['./cardset-editor.component.scss']
})
export class CardsetEditorComponent implements OnInit {

  @ViewChildren("tSpans") tSpans!: QueryList<ElementRef>;
  @ViewChildren("dSpans") dSpans!: QueryList<ElementRef>;

  public flashcardSet?: FlashcardSet;
  public flashcardSetID?: number;

  private importModal: any;
  public importText: string = "";
  public iForm = new UntypedFormGroup({
    tdSep: new UntypedFormControl('\\t'),
    cSep: new UntypedFormControl('\\n'),
    align: new UntypedFormControl('1'),
    tdCustom: new UntypedFormControl(''),
    cCustom: new UntypedFormControl(''),
    tdCustomInput: new FormControl(),
    cCustomInput: new FormControl()
  });
  public tdCustom: string = "";
  public cCustom: string = "";

  public flashcardSetName: string = "";
  public flashcardSetDescription: string = "";

  public flashcardList: EditFlashcard[] = [];

  public removedList: Flashcard[] = [];

  public focusIndex: number = -1;

  selectedTags: any = [];
  tags: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private flashcardService: FlashcardService, private titleService: Title) {

   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flashcardSetID = params['id'];
      if (this.flashcardSetID == -1) {
        this.flashcardSet = new FlashcardSet(-1, "", "", localStorage.getItem("username")!, [], true, true, 0, 0, []);
        this.flashcardList.push(EditFlashcard.createEmpty());
        setTimeout(() => this.setData(), 0);
      } else {
        this.flashcardService.getFlashcardSet(this.flashcardSetID!).subscribe(response => {
          this.flashcardSet = response.data;
          this.flashcardSetName = this.flashcardSet?.name!;
          this.flashcardSetDescription = this.flashcardSet?.description!;

          this.flashcardSet?.flashcards.forEach(item => this.flashcardList.push(new EditFlashcard(item)));
          this.flashcardList.push(EditFlashcard.createEmpty());
          setTimeout(() => this.setData(), 0);

          this.flashcardSet?.tags.forEach((tag: string, index: number) => {
            this.selectedTags = [...this.selectedTags, { name: tag }];
          });
        });
      }

    });
    this.flashcardService.getTagList().subscribe(response => {
      response.data.forEach((tag: any, index: number) => {
        this.tags = [...this.tags, { name: tag }];
      });
    });

    this.importModal = new window.bootstrap.Modal(document.getElementById('importModal'));
  }

  private setData(): void {
    this.flashcardList.forEach((card: EditFlashcard, index: number) => {
      this.tSpans.get(index)!.nativeElement.innerText = card.term;
      this.dSpans.get(index)!.nativeElement.innerText = card.definition;
    });
  }

  public setAlignment(index: number, alignment: number) {
    this.flashcardList[index].alignment = alignment;
  }

  onPaste(e: any): void {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand("insertText", false, text);
  }


  public onChange(index: number, event: Event) {
    if ((event.target as HTMLElement).className == "term") {
      this.flashcardList[index].term = (event.target as HTMLElement).innerText;
    } else {
      this.flashcardList[index].definition = (event.target as HTMLElement).innerText;
    }
    // check if it is the last card, if so add a new one
    if (index == this.flashcardList.length -1) {
      this.flashcardList.push(EditFlashcard.createEmpty());
    } else if (this.flashcardList[index].editType != EditType.New) {
      // set the card as modified
      this.flashcardList[index].editType = EditType.Modified;
    }
  }

  public onRemove(index: number) {
    if (index != this.flashcardList.length -1 && this.flashcardList[index].editType != EditType.New) {
      this.removedList.push((this.flashcardList.splice(index, 1)[0]));
    } else if (index != this.flashcardList.length -1 && this.flashcardList[index].editType == EditType.New) {
      this.flashcardList.splice(index, 1);
    }
  }

  public onFocusIn(index: number) {
    this.focusIndex = index;
  }

  public checkPreviewBounds(): boolean {
    return 0 <= this.focusIndex && this.focusIndex < this.flashcardList.length;
  }

  public openImportDialog(): void {
    this.importModal.show();
  }

  public import(): void {
    let tdSep = this.iForm.value.tdSep;
    let cSep = this.iForm.value.cSep;
    let align = Number(this.iForm.value.align);
    if (tdSep == "tdCustom") {
      tdSep = this.iForm.value.tdCustomInput;
      if (!tdSep) {
        tdSep = "=";
      }
    }
    if (cSep == "cCustom") {
      cSep = this.iForm.value.cCustomInput;
      if (!cSep) {
        cSep = "\\n\\n";
      }
    }

    tdSep = tdSep.replaceAll("\\t", "\t").replaceAll("\\n", "\n");
    cSep = cSep.replaceAll("\\t", "\t").replaceAll("\\n", "\n");

    let cardStrings: string[] = this.importText.split(cSep);
    let cards: string[][] = [];
    cardStrings.forEach(s => {
      let card: string[] = s.split(tdSep, 2);
      if (card.length == 1) {
        card.push("");
      }
      if (card[0] != "" || card[1] != "") {
        cards.push(card);
      }
    });

    // remove empty card at the end
    this.flashcardList.pop();
    // concat with imported cards, and add empty card at the end
    this.flashcardList = [...this.flashcardList, ...cards.map(card => new EditFlashcard(new Flashcard(-1, card[0], card[1], align, false, 0), EditType.New)), EditFlashcard.createEmpty()];

    setTimeout(() => this.setData(), 0);

    this.importModal.hide();
    this.importText = "";
  }

  public onDelete(): void {
    let deleteRequest = new DeleteFlashcardSetRequest(this.flashcardSetID!);
    this.flashcardService.deleteFlashcardSet(deleteRequest).subscribe((response) => {
      this.router.navigate(["dashboard"]);
    });
  }

  private getTags(): string[] {
    let tags: string[] = [];
    this.selectedTags.forEach((element: any) => {
      tags.push(element.name);
    });
    return tags;
  }

  public onSubmit() {
    if (this.flashcardSetID == -1) {
      let tags = this.getTags();
      let cards = this.flashcardList.slice(0, -1);
      let createNewFlashcardSetRequest = new CreateFlashcardSetRequest(this.flashcardSetName, this.flashcardSetDescription, tags, cards);

      this.flashcardService.createNewFlashcardSet(createNewFlashcardSetRequest).subscribe((response) => {
        this.router.navigate(['view/' + response.data]);
      });
    } else {
      let newTags = this.setMinus(this.getTags(), this.flashcardSet!.tags);
      let removedTags = this.setMinus(this.flashcardSet!.tags, this.getTags());
      let newCards = this.flashcardList.filter(card => card.editType == EditType.New).slice(0, -1);
      let modifiedCards = this.flashcardList.filter(card => card.editType == EditType.Modified);
      let editRequest = new EditFlashcardSetRequest(this.flashcardSet!.id, this.flashcardSetName, this.flashcardSetDescription, newTags, removedTags, modifiedCards, newCards, this.removedList);

      this.flashcardService.editFlashcardSet(editRequest).subscribe((response =>
        this.router.navigate(['view/' + this.flashcardSet!.id])
      ));
    }
  }

  private setMinus(minuend: any[], subtrahend: any[]) {
    return minuend.filter((element) => !subtrahend.includes(element));
  }

}
enum EditType {
  Unchanged,
  Modified,
  New
}

class EditFlashcard extends Flashcard {

  editType: EditType = EditType.Unchanged;

  static createEmpty() {
    const card = new EditFlashcard(new Flashcard(-1, "", "", 1, false, 0));
    card.editType = EditType.New;
    return card;
  }

  constructor(flashcard: Flashcard, editType?: EditType) {
    super(flashcard.id, flashcard.term, flashcard.definition, flashcard.alignment, flashcard.star, flashcard.learnState);
    if (editType) {
      this.editType = editType;
    }
  }

}
