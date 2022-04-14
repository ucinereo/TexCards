import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { KatexModule } from 'ng-katex';

import { AppComponent } from './app.component';
import { CardViewerComponent } from './card-viewer/card-viewer.component';
import { CardsetSelectorComponent } from './cardset-selector/cardset-selector.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CardViewerComponent,
    CardsetSelectorComponent
  ],
  imports: [
    BrowserModule,
    KatexModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
