import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'' , loadChildren: () => import('./landing-display/landing-display.module').then(m => m.LandingDisplayModule)},
  {path:'city/:cityName' , loadChildren: ()=> import('./weather-dashboard/weather-dashboard.module').then(m => m.WeatherDashboardModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
