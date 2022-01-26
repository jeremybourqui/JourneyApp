import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyTripPageRoutingModule } from './modify-trip-routing.module';

import { ModifyTripPage } from './modify-trip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyTripPageRoutingModule
  ],
  declarations: [ModifyTripPage]
})
export class ModifyTripPageModule {}
