import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MarkdownModule } from 'ngx-markdown';
import 'prismjs';
import 'prismjs/components/prism-java.min.js';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-c.min.js';
import 'prismjs/components/prism-cpp.min.js';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';

import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { CardViewerComponent } from './card-viewer/card-viewer.component';
import { CardsetSelectorComponent } from './cardset-selector/cardset-selector.component';
import { AppRoutingModule } from './app-routing.module';
import { CardsetEditorComponent } from './cardset-editor/cardset-editor.component';
import { LoginComponent } from './login/login.component';
import { BasicAuthInterceptor } from './services/auth/basic-auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { CardsetShareComponent } from './cardset-share/cardset-share.component';
import { RegisterComponent } from './register/register.component';
import { ErrorViewComponent } from './error-view/error-view.component';
import { CardComponent } from './card/card.component';
import { CardsetOverviewComponent } from './cardset-overview/cardset-overview.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { CardsetImportComponent } from './cardset-import/cardset-import.component';
import { CardsetCreationDialogComponent } from './dashboard/cardset-creation-dialog/cardset-creation-dialog.component';


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
    CardsetCreationDialogComponent
  ],
  imports: [
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTabsModule,
    MatDialogModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
