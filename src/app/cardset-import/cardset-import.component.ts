import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardSetImport } from '../model/flashcard-set-import';
import { FlashcardService } from '../services/flashcard.service';

@Component({
  selector: 'app-cardset-import',
  templateUrl: './cardset-import.component.html',
  styleUrls: ['./cardset-import.component.scss']
})
export class CardsetImportComponent implements OnInit {

  public flashcardSetName!: string;
  public flashcardSetID!: number;

  public inputText: string = '';

  public iForm = new UntypedFormGroup({
    tdSeparator: new UntypedFormControl('\\t'),
    cSeparator: new UntypedFormControl('\\n'),
    align: new UntypedFormControl('2'),
    tdCustom: new UntypedFormControl(''),
    cCustom: new UntypedFormControl('')
  });

  constructor(private flashcardService: FlashcardService,  private route: ActivatedRoute, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.flashcardSetID = params['id'];
      this.flashcardService.getFlashcardSetName(this.flashcardSetID).subscribe(response => this.flashcardSetName = response.data.flashcardSetName, (error) => { });
    });

    this.titleService.setTitle("Tex-Cards Import");
  }

  submit(): void {
    let tdSep = this.iForm.value.tdSeparator;
    let cSep = this.iForm.value.cSeparator;
    let align = this.iForm.value.align;
    let txt = this.inputText;
    if (tdSep == "td-custom") {
      if (this.iForm.value.tdCustom) {
        tdSep = this.iForm.value.tdCustom;
      } else {
        tdSep = "=";
      }
    }

    if (cSep == "c-custom") {
      if (this.iForm.value.cCustom) {
        cSep = this.iForm.value.cCustom;
      } else {
        cSep = "\\n\\n";
      }
    }

    let flashcardSetImport = new FlashcardSetImport(this.flashcardSetID, tdSep, cSep, align, txt);
    this.flashcardService.importFlashcardSet(flashcardSetImport).subscribe(response => {
      if (response.data) {
        this.router.navigate(['cards/' + this.flashcardSetID]);
      }
    }, (error) => { });

  }

}
