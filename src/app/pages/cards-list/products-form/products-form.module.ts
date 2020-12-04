import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsFormPageRoutingModule } from './products-form-routing.module';

import { ProductsFormPage } from './products-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsFormPageRoutingModule
  ],
  declarations: [ProductsFormPage]
})
export class ProductsFormPageModule {}
