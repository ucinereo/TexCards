import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { extractMath, Segment } from 'extract-math';
import {MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'card',
  template: `
    <markdown katex ngPreserveWhitespaces>{{ paragraph }}</markdown>
  `
})
export class CardComponent implements OnInit {

  segments: Segment[] = [];

  @Input() paragraph!: string;

  constructor(private markdownService: MarkdownService) { }

  ngOnInit() {
    this.markdownService.renderer.heading = (text: string, level: number) => {
      console.log("intercept");
      
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return '<h' + level + '>' +
               '<a name="' + escapedText + '" class="anchor" href="#' + escapedText + '">' +
                 '<span class="header-link"></span>' +
               '</a>' + text +
             '</h' + level + '>';
    };
  }

}