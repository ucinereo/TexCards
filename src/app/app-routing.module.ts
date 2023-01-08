import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsetSelectorComponent } from './app/cardset-selector/cardset-selector.component';
import { CardViewerComponent } from './app/card-viewer/card-viewer.component';
import { CardsetEditorComponent } from './app/cardset-editor/cardset-editor.component';
import { CardsetShareComponent } from './app/cardset-share/cardset-share.component';
import { LoginComponent } from './static/login/login.component';
import { RegisterComponent } from './static/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorViewComponent } from './error-view/error-view.component'
import { CardsetOverviewComponent } from './app/cardset-overview/cardset-overview.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { CardsetImportComponent } from './cardset-import/cardset-import.component';
import {HomeComponent} from "./static/home/home.component";
import {ProfileComponent} from "./app/profile/profile.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sets', component: CardsetSelectorComponent , canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'editor/:id', component: CardsetEditorComponent, canActivate: [AuthGuard] },
  { path: 'import/:id', component: CardsetImportComponent, canActivate: [AuthGuard] },
  { path: 'cards/:id', component: CardViewerComponent , canActivate: [AuthGuard] },
  { path: 'share/:id', component: CardsetShareComponent, canActivate: [AuthGuard] },
  { path: 'view/:id', component: CardsetOverviewComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'error/:id/:txt', component: ErrorViewComponent}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
