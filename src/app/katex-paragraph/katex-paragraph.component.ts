import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { extractMath, Segment } from 'extract-math';

@Component({
  selector: 'katex-paragraph',
  template: `
    <p>
      <ng-container *ngFor="let segment of segments">
        <ng-katex
          *ngIf="segment.math else text"
          [equation]="segment.raw"
          [options]="{ displayMode: segment.type === 'display', throwOnError: false }">
        </ng-katex>
        <ng-template #text>{{ segment.value }}</ng-template>
      </ng-container>
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KatexParagraphComponent {

  segments: Segment[] = [];

  private _paragraph!: string;

  @Input() set paragraph(paragraph: string) {

    if (paragraph !== this._paragraph) {
      this._paragraph = paragraph;
      this.segments = extractMath(this._paragraph);
    }
  }

}