import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingDisplayService {
  countryName:string = "";
  constructor(private httpClient: HttpClient) {}

  // get user location
  getUserLocation(): Observable<any> {
    // https://api.ipregistry.co/?key=iv5wxlupkorfvpwf << i used it before
    return this.httpClient.get('https://ipgeolocation.abstractapi.com/v1/?api_key=b50bb84adc8f463ca7939682c57b706b');
  }

  // get current weather for country
  getCurrentWeather(countryName: string): Observable<any> {

    return this.httpClient.get(`https://api.worldweatheronline.com/premium/v1/weather.ashx?q=${countryName}&key=69dbb2b1839849bf957165138222203&format=json`);
  }

  // get cities by country name

  getCitiesByCountry(countryName: string): Observable<any> {

    return this.httpClient.get(`https://shivammathur.com/countrycity/cities/${countryName}`)
  }

  getCountryName(){
    return this.countryName;
  }

  setCountryName(countryName:string){
    this.countryName = countryName;
  }
}
