import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CardsetSelectorComponent } from './cardset-selector/cardset-selector.component';
import { CardViewerComponent } from './card-viewer/card-viewer.component';

const routes: Routes = [
  { path: '', redirectTo: '/sets', pathMatch: 'full'},
  { path: 'sets', component: CardsetSelectorComponent },
  { path: 'cards/:set-name', component: CardViewerComponent }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
