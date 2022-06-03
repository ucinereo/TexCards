import { Component, Input, OnInit } from '@angular/core';
import mermaid from "mermaid";
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
export class CardComponent implements OnInit {

  public options: KatexOptions = {
    displayMode: false,
    throwOnError: false,
  }

  _paragraph!: string;

  @Input() align: number = 2;

  @Input() set paragraph(paragraph: string) {
    
    this._paragraph = paragraph;

    setTimeout(() => {
      mermaid.init(document.querySelectorAll(".mermaid"));
      mermaid.initialize({ });
    }, 5);
  }

  constructor(private markdownService: MarkdownService) { }

  ngOnInit(): void {
    this.markdownService.renderer.code = (code, language) => {
      if (language?.match('^mermaid')) {
        return '<div class="mermaid">' + code + '</div>';
      } else {
        return this.renderCode(code, language!);
      }
    }
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

  private renderCode(code: string, language: string) {
    if (this.markdownService.renderer.options.highlight) {
      const out = this.markdownService.renderer.options.highlight(code, language);
      if (out != null && out !== code) {
        code = out;
      }
    }

    code = code.replace(/\n$/, '') + '\n';

    if (!language) {
      return '<pre><code>' + code + '</code></pre>\n';
    }

    return '<pre><code class="' + this.markdownService.renderer.options.langPrefix + language + '">' + code + '</code></pre>\n';
  }

}
