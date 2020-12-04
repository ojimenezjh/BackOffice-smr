import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsListPage } from './cards-list.page';

const routes: Routes = [
  {
    path: '',
    component: CardsListPage
  },  {
    path: 'products-form',
    loadChildren: () => import('./products-form/products-form.module').then( m => m.ProductsFormPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class CardsListPageRoutingModule {}
