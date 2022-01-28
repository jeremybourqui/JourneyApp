import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesPage } from './places.page';

const routes: Routes = [
  {
    path: '',
    component: PlacesPage
  },
  {
    path: ':tripId/create-place',
    loadChildren: () => import('../../Trips/Places/create-place/create-place.module').then( m => m.CreatePlacePageModule)
  },
  {
    path: 'place-details/:placeId',
    loadChildren: () => import('../../Trips/Places/place-details/place-details.module').then( m => m.PlaceDetailsPageModule)
  },
  {
    path: 'modify-places/:placeId',
    loadChildren: () => import('./modify-places/modify-places.module').then( m => m.ModifyPlacesPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesPageRoutingModule {}
