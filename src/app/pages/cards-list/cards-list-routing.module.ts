import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsListPage } from './cards-list.page';

const routes: Routes = [
  {
    path: '',
    component: CardsListPage
  },  {
    path: 'card-form',
    loadChildren: () => import('./card-form/card-form.module').then( m => m.CardFormPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class CardsListPageRoutingModule {}
