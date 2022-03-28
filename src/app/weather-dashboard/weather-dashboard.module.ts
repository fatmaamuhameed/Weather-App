import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherDashboardRoutingModule } from './weather-dashboard-routing.module';
import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';


@NgModule({
  declarations: [WeatherDashboardComponent],
  imports: [
    CommonModule,
    WeatherDashboardRoutingModule
  ]
})
export class WeatherDashboardModule { }
