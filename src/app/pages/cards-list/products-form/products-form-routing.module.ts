import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsFormPage } from './products-form.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsFormPageRoutingModule {}
