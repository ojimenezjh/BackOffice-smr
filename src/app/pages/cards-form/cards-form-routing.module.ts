import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsFormPage } from './cards-form.page';

const routes: Routes = [
  {
    path: '',
    component: CardsFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardsFormPageRoutingModule {}
