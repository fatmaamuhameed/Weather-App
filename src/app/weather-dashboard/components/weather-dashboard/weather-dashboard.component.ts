import { WeatherDashboardService } from './../../service/weather-dashboard.service';
import { LandingDisplayService } from './../../../landing-display/service/landing-display.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css']
})
export class WeatherDashboardComponent implements OnInit {

  cityName:string = "";
  countryName:string = "";
  tempC:number = 0;
  describeWeather:string = "";
  visibilty:number = 0;
  windSpeed:number = 0;
  humidity:number = 0;
  todayDate:any = new Date();
  historicalWeather:boolean = false;
  averageTempHistorical:string = "";
  maxTempHistorical:string = "";
  minTempHistorical:string = ""
  forcastWeather:Array<any> = [];
  errorrMessage:boolean = false;
  errorMessageStr : string = ""
  currentRate = 8;
  width: number;
  height: number;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  x: any;
  y: any;
  svg: any;
  g: any;
  
  StatsBarChart: any[] = [];
  constructor(private router:ActivatedRoute , private landingDisplayService:LandingDisplayService , private weatherDashboardService:WeatherDashboardService) {
    this.todayDate = moment(this.todayDate).format('YYYY-MM-DD');
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    
    
   }

  ngOnInit(): void {
    this.cityName = this.router.snapshot.paramMap.get('cityName') || "";
    this.landingDisplayService.getCurrentWeather(this.cityName).subscribe((res:any) => {      
      this.countryName = this.landingDisplayService.getCountryName();        
      if(res.data.error == undefined){
        if(res.data.request[0].query.includes(this.countryName)){
          this.errorrMessage = false;
          this.tempC = res.data.current_condition[0].temp_C;
          this.describeWeather = res.data.current_condition[0].weatherDesc[0].value;
          this.visibilty = res.data.current_condition[0].visibility;
          this.windSpeed = res.data.current_condition[0].windspeedKmph;
          this.humidity = res.data.current_condition[0].humidity;
          this.forcastWeather = res.data.weather;
          for(let i = 0 ; i < res.data.ClimateAverages[0].month.length ; i++){
            this.StatsBarChart.push({monthName : res.data.ClimateAverages[0].month[i].name , averageMinTemp : res.data.ClimateAverages[0].month[i].avgMinTemp })
          }
          this.initSvg();
          this.initAxis();
          this.drawAxis();
          this.drawBars();
        }
        else{
          this.errorrMessage = true;
          this.errorMessageStr = "Unable to find any matching weather location to the query submitted!";
        }
        
      }
      else{
        this.errorrMessage = true;
        this.errorMessageStr = res.data.error[0].msg;
        console.log(res.data.error[0].msg);
      }
    });

  }

  initSvg() {
    this.svg = d3.select('#barChart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.StatsBarChart.map((d) => d.monthName));
    this.y.domain([0, d3Array.max(this.StatsBarChart, (d) => d.averageMinTemp)]);
  }

  drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .attr('style' , 'font-size:13px; color:white')
      .call(d3Axis.axisBottom(this.x));
    this.g.append('g')
    .attr('style' , 'font-size:15px; color:white')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('averageMinTemp');
  }

  drawBars() {
    this.g.selectAll('.bar')
      .data(this.StatsBarChart)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d:any) => this.x(d.monthName))
      .attr('y', (d:any) => this.y(d.averageMinTemp))
      .attr('width', this.x.bandwidth())
      .attr('fill', '#fdfcfa')
      .attr('height', (d:any) => this.height - this.y(d.averageMinTemp));
  }

  getHistoricalDate($event:any){
    console.log($event.target.value);
    this.weatherDashboardService.getHistoricalWeather($event.target.value , this.cityName).subscribe((res:any) => {
      console.log(res.data.weather[0]);
      this.averageTempHistorical = res.data.weather[0].avgtempC;
      this.maxTempHistorical = res.data.weather[0].maxtempC;
      this.minTempHistorical = res.data.weather[0].mintempC;
      this.historicalWeather = true;
    })
  }

 
}
