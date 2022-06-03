import { Component, ElementRef, OnInit } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { MarkdownServiceWrap } from '../markdown-service-wrap';

@Component({
  selector: 'app-ngx-markdown-wrap',
  templateUrl: './ngx-markdown-wrap.component.html',
  styleUrls: ['./ngx-markdown-wrap.component.scss']
})
export class NgxMarkdownWrapComponent extends MarkdownComponent {


  constructor(element: ElementRef<HTMLElement>, markdownService: MarkdownServiceWrap) {
    super(element, markdownService);
  }

}
