import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PlaceDetailsPage } from './place-details.page';


const routes: Routes = [
  {
    path: '',
    component: PlaceDetailsPage
  },
  {
    path: 'modify-places/:placeId',
    loadChildren: () => import('../../../Trips/places/modify-places/modify-places.module').then( m => m.ModifyPlacesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceDetailsPageRoutingModule {}
