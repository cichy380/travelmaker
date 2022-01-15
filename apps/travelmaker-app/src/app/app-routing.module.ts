import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinationsModule } from './destinations/destinations.module';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'destinations',
    pathMatch: 'full',
  },
  {
    path: 'destinations',
    loadChildren: () => DestinationsModule,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
