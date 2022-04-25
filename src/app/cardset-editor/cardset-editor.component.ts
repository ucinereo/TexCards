import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardSet } from '../flashcard-set';
import { FlashcardService } from '../services/flashcard.service';

@Component({
  selector: 'app-cardset-editor',
  templateUrl: './cardset-editor.component.html',
  styleUrls: ['./cardset-editor.component.scss']
})
export class CardsetEditorComponent implements OnInit {

  @ViewChildren("tSpans") tSpans!: QueryList<ElementRef>;
  @ViewChildren("dSpans") dSpans!: QueryList<ElementRef>;
  @ViewChild("name") flashcardSetNameInput!: ElementRef;

  public terms: string[] = [""];
  public definitions: string[] = [""];

  public count: number = 1;
  public focusIndex: number = 0;
  public termFocus: boolean = true;

  public setName: string = "ParaProg";

  public flashcardSet?: FlashcardSet;
  public flashcardSetID?: number;

  constructor(private route: ActivatedRoute, private router: Router, private flashcardService: FlashcardService, private titleService: Title) {

   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flashcardSetID = params['id'];
      this.flashcardService.getFlashcardSet(this.flashcardSetID!).subscribe(response => {
        this.flashcardSet = response.data;
        this.count = this.flashcardSet!.terms.length + 1;
        this.terms = this.flashcardSet!.terms;
        this.definitions = this.flashcardSet!.definitions;
        this.terms.push("");
        this.definitions.push("");
        this.titleService.setTitle("Tex-Cards " + this.flashcardSet!.flashcardSetName);
        setTimeout(() => this.setupData(), 5);
      }, (error) => { })
    });
  }

  setupData(): void {
    for (var i = 0; i < this.count -1; i++) {
      this.dSpans.get(i)!.nativeElement.innerText = this.terms[i];
      this.tSpans.get(i)!.nativeElement.innerText = this.definitions[i];
    }
  }

  submit(): void {
    this.flashcardSet!.definitions= this.definitions;
    this.flashcardSet!.terms= this.terms;
    this.flashcardSet?.definitions.pop();
    this.flashcardSet?.terms.pop();
    this.flashcardSet!.flashcardSetName = this.flashcardSetNameInput.nativeElement.value;
    this.flashcardService.editFlashcardSet(this.flashcardSet!).subscribe(response => {
      if (response.data) {
        this.router.navigate(['cards/' + this.flashcardSet!.id]);
      }
    }, (error) => { });
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
      this.count++;
    }
  }

  onFocusOut(index: number): void {
    this.focusIndex = -1;
    setTimeout(() => this.checkForEmpty(index), 5); // TODO clean up, i think this isn't guaranteed to work 
  }

  onFocusIn(index: number, termFocus: boolean): void {
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
      this.count--;
    }
  }

  deleteFlashcardSet(): void {
    this.flashcardService.deleteFlashcardSet(this.flashcardSet!).subscribe(response => {
      if (response.data) {
        this.router.navigate(['']);
      }
    }, (error) => { });
  }

}
