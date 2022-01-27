import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacesPageRoutingModule } from './places-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { PlacesPage } from './places.page';

// import for search bar
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// import Leaflet
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    PlacesPageRoutingModule,
    Ng2SearchPipeModule,
    LeafletModule
  ],
  declarations: [PlacesPage]
})
export class PlacesPageModule {}
