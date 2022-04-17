import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CardsetSelectorComponent } from './cardset-selector/cardset-selector.component';
import { CardViewerComponent } from './card-viewer/card-viewer.component';
import { CardsetEditorComponent } from './cardset-editor/cardset-editor.component';

const routes: Routes = [
  { path: '', redirectTo: '/sets', pathMatch: 'full'},
  { path: 'sets', component: CardsetSelectorComponent },
  { path: 'editor/:id', component: CardsetEditorComponent},
  { path: 'cards/:id', component: CardViewerComponent }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
