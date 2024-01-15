import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightFormComponent } from './flight-form/flight-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlightPathComponent } from './flight-path/flight-path.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightFormComponent,
    FlightPathComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
