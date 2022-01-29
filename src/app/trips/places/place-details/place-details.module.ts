import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { PlaceDetailsPageRoutingModule } from './place-details-routing.module';

import { PlaceDetailsPage } from './place-details.page';

// import Leaflet
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceDetailsPageRoutingModule,
    HttpClientModule,
    LeafletModule
  ],
  declarations: [PlaceDetailsPage]
})
export class PlaceDetailsPageModule {}
