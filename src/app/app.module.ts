import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { KatexModule } from 'ng-katex';

import { AppComponent } from './app.component';
import { CardViewerComponent } from './card-viewer/card-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    CardViewerComponent
  ],
  imports: [
    BrowserModule,
    KatexModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
