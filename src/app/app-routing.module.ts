import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightPathComponent } from './flight-path/flight-path.component';
import { FlightFormComponent } from './flight-form/flight-form.component';

const routes: Routes = [
  {
    path: '', component: FlightFormComponent
  }, {
    path: 'flight-path', component: FlightPathComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
