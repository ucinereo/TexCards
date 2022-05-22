import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { KatexOptions, MarkdownService } from 'ngx-markdown';

import mermaid from "mermaid";

import katex from "katex";

@Component({
  selector: 'card',
  template: `
    <p>
      <markdown katex lineNumbers [katexOptions]="options" [data]="_paragraph" [style.text-align]="getTextAlignment()">
      </markdown>
    </p>
  `,
})
export class CardComponent implements OnInit {

  public options: KatexOptions = {
    displayMode: false,
    throwOnError: false,
  }

  _paragraph!: string;

  @Input() align: number = 2;

  @Input() set paragraph(paragraph: string) {

    while (this.countDisplayMathOccurrrences(paragraph) >= 2) {
      paragraph = paragraph.replace(/\$\$/, '\n```math\n').replace(/\$\$/, '\n```\n');
    }
    
    this._paragraph = paragraph;

    setTimeout(() => {
      mermaid.init(document.querySelectorAll(".mermaid"));
      mermaid.initialize({ });
      MathManager.displayMath.forEach((value: string, key: string) => {
        let element = document.getElementsByClassName(key)[0] as HTMLElement;
        if (element != undefined && element != null) {
          katex.render(value, element, { throwOnError: false, displayMode: true });
        }
      });
    }, 5);
  }

  constructor(private markdownService: MarkdownService) { }

  ngOnInit(): void {
    this.markdownService.renderer.code = (code, language) => {
      if (language?.match('^mermaid')) {
        return '<div class="mermaid">' + code + '</div>';
      } else if (language?.match('^math')) {
        let id = "tex-" + MathManager.mathID++;
        MathManager.displayMath.set(id, code);
        return '<div class="' + id + '"></div>';
      } else {
        return '<pre><code>' + code + '</code></pre>';
      }
    }
  }

  private countDisplayMathOccurrrences(input: string): number {
    return (input.match(/\$\$/g)||[]).length;
  }

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

class MathManager {
  public static mathID: number = 0;
  public static displayMath: Map<string, string> = new Map<string, string>();
}