import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardsFormPageRoutingModule } from './cards-form-routing.module';

import { CardsFormPage } from './cards-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardsFormPageRoutingModule
  ],
  declarations: [CardsFormPage]
})
export class CardsFormPageModule {}
