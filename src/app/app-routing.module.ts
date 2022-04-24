import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CardsetSelectorComponent } from './cardset-selector/cardset-selector.component';
import { CardViewerComponent } from './card-viewer/card-viewer.component';
import { CardsetEditorComponent } from './cardset-editor/cardset-editor.component';
import { CardsetShareComponent } from './cardset-share/cardset-share.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorViewComponent } from './error-view/error-view.component'

const routes: Routes = [
  { path: '', redirectTo: '/sets', pathMatch: 'full' },
  { path: 'sets', component: CardsetSelectorComponent , canActivate: [AuthGuard] },
  { path: 'editor/:id', component: CardsetEditorComponent, canActivate: [AuthGuard] },
  { path: 'cards/:id', component: CardViewerComponent , canActivate: [AuthGuard] },
  { path: 'share/:id', component: CardsetShareComponent, canActivate: [AuthGuard] },
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
