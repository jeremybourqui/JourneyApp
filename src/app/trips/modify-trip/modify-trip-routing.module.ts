import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyTripPage } from './modify-trip.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyTripPageRoutingModule {}
