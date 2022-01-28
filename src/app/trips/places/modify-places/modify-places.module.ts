import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyPlacesPageRoutingModule } from './modify-places-routing.module';

import { ModifyPlacesPage } from './modify-places.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyPlacesPageRoutingModule
  ],
  declarations: [ModifyPlacesPage]
})
export class ModifyPlacesPageModule {}
