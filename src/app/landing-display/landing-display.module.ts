import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingDisplayRoutingModule } from './landing-display-routing.module';
import { LandingDisplayComponent } from './components/landing-display/landing-display.component';


@NgModule({
  declarations: [LandingDisplayComponent],
  imports: [
    CommonModule,
    LandingDisplayRoutingModule
  ]
})
export class LandingDisplayModule { }
