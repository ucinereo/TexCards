import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { CardViewerComponent } from './app/card-viewer/card-viewer.component';
import { CardsetSelectorComponent } from './app/cardset-selector/cardset-selector.component';
import { AppRoutingModule } from './app-routing.module';
import { CardsetEditorComponent } from './app/cardset-editor/cardset-editor.component';
import { LoginComponent } from './static/login/login.component';
import { BasicAuthInterceptor } from './services/auth/basic-auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { CardsetShareComponent } from './app/cardset-share/cardset-share.component';
import { RegisterComponent } from './static/register/register.component';
import { ErrorViewComponent } from './error-view/error-view.component';
import { CardComponent } from './card/card.component';
import { CardsetOverviewComponent } from './app/cardset-overview/cardset-overview.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { CardsetImportComponent } from './cardset-import/cardset-import.component';
import { CardsetCreationDialogComponent } from './app/cardset-creation-dialog/cardset-creation-dialog.component';
import { HomeComponent } from './static/home/home.component';
import { CardFlipperComponent } from './app/card-flipper/card-flipper.component';
import { CardCarouselComponent } from './app/card-carousel/card-carousel.component';
import { FlashcardsetSummaryComponent } from './app/flashcardset-summary/flashcardset-summary.component';
import {NgSelectModule} from "@ng-select/ng-select";
import { FlashcardsetSummaryListComponent } from './app/flashcardset-summary-list/flashcardset-summary-list.component';
import { ProfileComponent } from './app/profile/profile.component';
import { PieChartComponent } from './app/pie-chart/pie-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    CardViewerComponent,
    CardsetSelectorComponent,
    CardsetEditorComponent,
    LoginComponent,
    CardsetShareComponent,
    RegisterComponent,
    ErrorViewComponent,
    CardComponent,
    CardsetOverviewComponent,
    DashboardComponent,
    ErrorDialogComponent,
    CardsetImportComponent,
    CardsetCreationDialogComponent,
    HomeComponent,
    CardFlipperComponent,
    CardCarouselComponent,
    FlashcardsetSummaryComponent,
    FlashcardsetSummaryListComponent,
    ProfileComponent,
    PieChartComponent,
  ],
    imports: [
        BrowserModule,
        HammerModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MarkdownModule.forRoot({
            sanitize: SecurityContext.NONE
        }),
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
