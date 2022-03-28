import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherDashboardService {

  constructor(private httpClient:HttpClient) {
    
   }

  getHistoricalWeather(date:string , city:string):Observable<any>{
    return this.httpClient.get(`https://api.worldweatheronline.com/premium/v1/past-weather.ashx?date=${date}&q=${city}&key=69dbb2b1839849bf957165138222203&format=json`)
  }
}
