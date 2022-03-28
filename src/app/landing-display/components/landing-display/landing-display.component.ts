import { LandingDisplayService } from './../../service/landing-display.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-landing-display',
  templateUrl: './landing-display.component.html',
  styleUrls: ['./landing-display.component.css']
})
export class LandingDisplayComponent implements OnInit {

  countryName:string = "";
  tempC:number = 0;
  describeWeather:string = "";
  visibilty:number = 0;
  windSpeed:number = 0;
  humidity:number = 0;
  city:string = "";
  todayDate:any = new Date();
  CitiesByCountry:Array<any> = [];

  constructor(private landingDisplayService:LandingDisplayService , private router:Router) {    
   }

  ngOnInit(): void {

    this.landingDisplayService.getUserLocation().subscribe((res:any) => {
      this.countryName = res.country;
      this.landingDisplayService.setCountryName(this.countryName);
      this.landingDisplayService.getCurrentWeather(this.countryName).subscribe((res:any) => {
        if(res.data.error == undefined){
          this.tempC = res.data.current_condition[0].temp_C;
          this.describeWeather = res.data.current_condition[0].weatherDesc[0].value;
          this.visibilty = res.data.current_condition[0].visibility;
          this.windSpeed = res.data.current_condition[0].windspeedKmph;
          this.humidity = res.data.current_condition[0].humidity;

          
          this.landingDisplayService.getCitiesByCountry(this.countryName).subscribe((res:any) => {
            this.CitiesByCountry = res
          })
        }
        else{
          console.log(res.data.error[0].msg);
        }
      });
    })
  }

  chooseCity($event:any){
    console.log($event.target.value);
    this.city = $event.target.value;
  }

  searchWeatherCity(){
    if(this.city != ""){
      this.router.navigate([`city/${this.city}`])
    }
  }

}
