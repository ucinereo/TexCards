import { Component, Input } from '@angular/core';
import { MermaidAPI } from 'ngx-markdown';



@Component({
  selector: 'card',
  template: `
    <div>
      <markdown katex mermaid lineNumbers [katexOptions]="options" [mermaidOptions]="mermaidOptions" [data]="_paragraph" [style.text-align]="getTextAlignment()">
      </markdown>
    </div>
  `,
  styles: [`:host { padding: 5px; }`],
})
export class CardComponent {

  public options: any = {
    throwOnError: false,
    output: 'html'
  }

  public mermaidOptions: MermaidAPI.Config = {
    theme: MermaidAPI.Theme.Forest
  }

  _paragraph!: string;

  @Input() align: number = 2;


  @Input() set paragraph(paragraph: string) {
    this._paragraph = paragraph.replaceAll('\\\\', '\\\\\\\\').replaceAll('\\#', '\\\\#').replaceAll('\\&', '\\\\&').replaceAll('\\_', '\\\\_').replaceAll('\\%', '\\\\%').replaceAll('\\{', '\\\\{').replaceAll('\\}', '\\\\}');
  }

  constructor() { }

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
