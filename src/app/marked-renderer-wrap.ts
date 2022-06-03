import { marked } from "marked";
import { MarkedRenderer } from "ngx-markdown";

export class MarkedRendererWrap extends MarkedRenderer {

    override code(this: marked.Renderer<never> | marked.RendererThis, code: string, language: string | undefined, isEscaped: boolean): string {
        if (language?.match('^mermaid')) {
            return '<div class="mermaid">' + code + '</div>';
        } else {
            return super.code(code, language, isEscaped);
        }
    }
}
