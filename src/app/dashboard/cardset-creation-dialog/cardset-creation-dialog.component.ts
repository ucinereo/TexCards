import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export enum CreationType { Create, Import }
export interface DialogType { type: CreationType }

@Component({
  selector: 'app-cardset-creation-dialog',
  template: `
            <div class="modal-content">
              <label class="modal-button"><i mat-dialog-close class="material-icons o-icon">close</i></label>
                <h2>{{ text }}</h2>
              <input #newName type="text" class="txt-input" placeholder="Flashcard set name">
              <label class="modal-button button"><i class="material-icons o-icon" (click)="submit()">east</i></label>
            </div>
  `,
  styleUrls: ['./cardset-creation-dialog.component.scss']
})
export class CardsetCreationDialogComponent {

  @ViewChild("newName") newFlashcardSetInput!: ElementRef;

  public text: string = "Create new flashcard set";

  constructor(@Inject(MAT_DIALOG_DATA) public dialogType: DialogType, private dialogRef: MatDialogRef<CardsetCreationDialogComponent>) {
    if (dialogType.type == CreationType.Create) {
      this.text = "Create new flashcard set";
    } else {
      this.text = "Import flashcard set";
    }
  }

  @HostListener('document:keydown.enter')
  public submit(): void {
    this.dialogRef.close(this.newFlashcardSetInput.nativeElement.value);
  }

}