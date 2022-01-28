import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyPlacesPage } from './modify-places.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyPlacesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyPlacesPageRoutingModule {}
