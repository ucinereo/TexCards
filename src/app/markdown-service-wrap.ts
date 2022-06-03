import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, PLATFORM_ID, SecurityContext, Optional, Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import katex, { KatexOptions } from "katex";
import { MarkdownService, SECURITY_CONTEXT, MarkedOptions, errorKatexNotLoaded } from "ngx-markdown";
import { MarkedRendererWrap } from "./marked-renderer-wrap";

@Injectable({
    providedIn: 'root'
})
export class MarkdownServiceWrap extends MarkdownService {


    constructor(
        @Inject(PLATFORM_ID) platform: Object,
        @Inject(SECURITY_CONTEXT) securityContext: SecurityContext,
        @Optional() http: HttpClient,
        @Optional() options: MarkedOptions,
        sanitizer: DomSanitizer,
    ) {
        super(platform, securityContext, http, options, sanitizer);
        this.renderer = new MarkedRendererWrap();
    }

    override renderKatex(html: string, options?: KatexOptions): string {
        if (typeof katex === 'undefined' || typeof katex.renderToString === 'undefined') {
            throw new Error(errorKatexNotLoaded);
        }
        const inlineLatexRegex = /\$([^\s]*?[^$]*?[^\s]*?)\$/gm;
        const displayLatexRegex = /\$\$([^\s]*?[^$]*?[^\s]*?)\$\$/;
        //Replace display mode math first.
        options!['displayMode'] = true;
        const replaceDisplayMode = html.replace(displayLatexRegex, (_, tex) => katex.renderToString(tex, options));
        options!['displayMode'] = false;
        const fullLatexProcessed = replaceDisplayMode.replace(inlineLatexRegex, (_, tex) => katex.renderToString(tex, options));
        return fullLatexProcessed;
    }

}
