import { Component, Input } from '@angular/core';
import mermaid from "mermaid";
import mermaidAPI from 'mermaid/mermaidAPI';
import { KatexOptions, MarkdownService } from 'ngx-markdown';



@Component({
  selector: 'card',
  template: `
    <p>
      <app-ngx-markdown-wrap katex lineNumbers [katexOptions]="options" [data]="_paragraph" [style.text-align]="getTextAlignment()">
      </app-ngx-markdown-wrap>
    </p>
  `,
})
export class CardComponent {

  public options: KatexOptions = {
    displayMode: false,
    throwOnError: false,
  }

  _paragraph!: string;

  @Input() align: number = 2;

  // @ts-nocheck
  @Input() set paragraph(paragraph: string) {
    
    this._paragraph = paragraph;

    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      mermaid.initialize({theme: 'forest'});
      mermaid.init(document.querySelectorAll(".mermaid"));
    }, 5);
  }

  constructor(private markdownService: MarkdownService) { }

  public getTextAlignment(): string {
    if (this.align == 1) {
      return "left";
    } else if (this.align == 2) {
      return "center";
    } else {
      return "right";
    }
  }

}
