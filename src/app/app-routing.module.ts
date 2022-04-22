import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CardsetSelectorComponent } from './cardset-selector/cardset-selector.component';
import { CardViewerComponent } from './card-viewer/card-viewer.component';
import { CardsetEditorComponent } from './cardset-editor/cardset-editor.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/sets', pathMatch: 'full' },
  { path: 'sets', component: CardsetSelectorComponent , canActivate: [AuthGuard] },
  { path: 'editor/:id', component: CardsetEditorComponent, canActivate: [AuthGuard] },
  { path: 'cards/:id', component: CardViewerComponent , canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
