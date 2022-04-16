import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { KatexModule } from 'ng-katex';

import { AppComponent } from './app.component';
import { CardViewerComponent } from './card-viewer/card-viewer.component';
import { CardsetSelectorComponent } from './cardset-selector/cardset-selector.component';
import { AppRoutingModule } from './app-routing.module';
import { CardsetEditorComponent } from './cardset-editor/cardset-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    CardViewerComponent,
    CardsetSelectorComponent,
    CardsetEditorComponent
  ],
  imports: [
    BrowserModule,
    KatexModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
