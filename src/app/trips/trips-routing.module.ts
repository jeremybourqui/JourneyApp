import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripsPage } from './trips.page';

const routes: Routes = [
  {
    path: '',
    component: TripsPage
  },
  {
    path: 'create-trip',
    loadChildren: () => import('../Trips/create-trip/create-trip.module').then( m => m.CreateTripPageModule)
  },
  {
    path: 'places',
    loadChildren: () => import('../Trips/places/places.module').then( m => m.PlacesPageModule)
  },
  {
    path: 'modify-trip/:tripId',
    loadChildren: () => import('./modify-trip/modify-trip.module').then( m => m.ModifyTripPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripsPageRoutingModule {}
