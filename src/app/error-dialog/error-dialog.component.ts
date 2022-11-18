import { Component, Inject, OnInit } from '@angular/core';

export interface ErrorData {
  status: number;
  title: string;
  msg: string;
}

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

 // constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorData) { }

  ngOnInit(): void {
  }

}
