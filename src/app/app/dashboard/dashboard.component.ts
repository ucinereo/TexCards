import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FlashcardsSets } from '../../model/flashcards-sets';
import { FlashcardService } from '../../services/flashcard.service';
import { CardsetCreationDialogComponent, CreationType } from '../cardset-creation-dialog/cardset-creation-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private dialogOpen: boolean = false;

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

  @HostListener('document:keydown.i')
  openImportDialog(): void {
    this.openDialog(CreationType.Import);
  }

  @HostListener('document:keydown.a')
  openCreateDialog(): void {
    this.openDialog(CreationType.Create);
  }

  private openDialog(creationType: CreationType) {
    if (!this.dialogOpen) {
      this.dialogOpen = true;
      // const ref = this.dialog.open(CardsetCreationDialogComponent, {panelClass: 'creation-dialog', data: {type: creationType}});
      //ref.afterClosed().subscribe(result => {
      //  if (result && result.length > 0) {
      //    this.createNewFlashcardSet(creationType, result);
      //  }
      //  this.dialogOpen = false;
      //});
    }
  }


  createNewFlashcardSet(creationType: CreationType, flashcardSetName: string): void {
    this.flashcardService.createNewFlashcardSet(flashcardSetName).subscribe(response => {
      if (creationType == CreationType.Create) {
        this.router.navigate(['editor/' + response.data]);
      } else {
        this.router.navigate(['import/' + response.data]);
      }
    }, (error) => { });
  }


}
