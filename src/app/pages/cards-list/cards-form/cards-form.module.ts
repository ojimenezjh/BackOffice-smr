import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardsFormPageRoutingModule } from './cards-form-routing.module';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { CardsFormPage } from './cards-form.page';

import { DxDataGridModule,
  DxBulletModule,
  DxTemplateModule } from 'devextreme-angular';
  import { DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxTreeListModule,
    DxFormModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardsFormPageRoutingModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxFormModule,
    DxTreeListModule,
    NgxMaterialTimepickerModule
  ],
  declarations: [CardsFormPage]
})
export class CardsFormPageModule {}
