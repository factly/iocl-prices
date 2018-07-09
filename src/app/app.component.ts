import { Component } from '@angular/core';
import 'hammerjs';
import { Chart } from 'angular-highcharts';
import * as _ from 'lodash';
import { GetDataService } from 'src/app/services/get-data.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  petrolData;
  dieselData;
  crudeData: any;
  showCrude = false;
  showPetrol = true;
  showDiesel = false;
  showCity = {
    "Mumbai": true,
    "Chennai": true,
    "Kolkata": true,
    "Delhi": true
  }
  showFuel = {
    "Petrol": true,
    "Diesel": false
  }
  minDate = new Date(2012, 4, 23);
  maxDate = new Date(2018, 5, 21);
  startDate;
  endDate;
  endMinDate = this.minDate;
  startMaxDate = this.maxDate;
  startDateControl = new FormControl(this.minDate);
  endDateControl = new FormControl(this.maxDate);
  title = 'app';
  chart = new Chart({
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis:
      {
        title: {
          text: 'Petrol Prices (Rupees/Litre)'
        }
      }
    ,
    legend: {
      enabled: false
    },
    series: [{
      name: 'Crude',
      data: null
    }],

  });

  filteredData;

  ngOnInit(): void {
    this.startDate = this.minDate.getTime();
    this.endDate = this.maxDate.getTime();
    this.filteredData = new OilData();
    this.petrolData = new PetrolData();
    this.fetchData();
  }
  changeStartDate($event) {
    console.log($event.value);
    var dateObject = new Date($event.value);
    this.endMinDate = dateObject;
    this.startDate = dateObject.getTime();
    this.applyFilters();
  }
  changeEndDate($event) {
    console.log($event.value);
    var dateObject = new Date($event.value);
    this.startMaxDate = dateObject;
    this.endDate = dateObject.getTime();
    this.applyFilters();
  }
  constructor(private getDataService: GetDataService) { }
  applyFilters() {
    this.filteredData.crudeData = _.cloneDeep(this.crudeData);
    this.filteredData.petrolData = _.cloneDeep(this.petrolData);
    this.filteredData.dieselData = _.cloneDeep(this.dieselData);
    console.log(this.petrolData)
    debugger;
    this.applyStartDatefilters();
    this.applyEndDatefilters();
    this.reloadData();
  }
  applyStartDatefilters() {
    let sDate = this.startDate;
    console.log(this.filteredData);
    this.filteredData.crudeData = _.filter(this.filteredData.crudeData, function (o) { return o[0] > sDate; });
    this.filteredData.petrolData.chennai = _.filter(this.filteredData.petrolData.chennai, function (o) { return o[0] > sDate; })
    this.filteredData.petrolData.mumbai = _.filter(this.filteredData.petrolData.mumbai, function (o) { return o[0] > sDate; })
    this.filteredData.petrolData.delhi = _.filter(this.filteredData.petrolData.delhi, function (o) { return o[0] > sDate; })
    this.filteredData.petrolData.kolkata = _.filter(this.filteredData.petrolData.kolkata, function (o) { return o[0] > sDate; })
    this.filteredData.dieselData.chennai = _.filter(this.filteredData.dieselData.chennai, function (o) { return o[0] > sDate; })
    this.filteredData.dieselData.mumbai = _.filter(this.filteredData.dieselData.mumbai, function (o) { return o[0] > sDate; })
    this.filteredData.dieselData.delhi = _.filter(this.filteredData.dieselData.delhi, function (o) { return o[0] > sDate; })
    this.filteredData.dieselData.kolkata = _.filter(this.filteredData.dieselData.kolkata, function (o) { return o[0] > sDate; })

    //console.log(this.filteredData);
  }
  applyEndDatefilters() {
    let eDate = this.endDate
    this.filteredData.crudeData = _.filter(this.filteredData.crudeData, function (o) { return o[0] <= eDate; });
    this.filteredData.petrolData.chennai = _.filter(this.filteredData.petrolData.chennai, function (o) { return o[0] <= eDate; })
    this.filteredData.petrolData.delhi = _.filter(this.filteredData.petrolData.delhi, function (o) { return o[0] <= eDate; })
    this.filteredData.petrolData.kolkata = _.filter(this.filteredData.petrolData.kolkata, function (o) { return o[0] <= eDate; })
    this.filteredData.petrolData.mumbai = _.filter(this.filteredData.petrolData.mumbai, function (o) { return o[0] <= eDate; })
    this.filteredData.dieselData.chennai = _.filter(this.filteredData.dieselData.chennai, function (o) { return o[0] <= eDate; })
    this.filteredData.dieselData.delhi = _.filter(this.filteredData.dieselData.delhi, function (o) { return o[0] <= eDate; })
    this.filteredData.dieselData.kolkata = _.filter(this.filteredData.dieselData.kolkata, function (o) { return o[0] <= eDate; })
    this.filteredData.dieselData.mumbai = _.filter(this.filteredData.dieselData.mumbai, function (o) { return o[0] <= eDate; })
  }
  reloadData() {
    while (this.chart.ref.series.length > 0)
      this.chart.removeSerie(0);
    if (this.showCrude)
      this.chart.addSerie({
        yAxis: 0,
        name: 'Crude',
        data: this.filteredData.crudeData
      });
    if (this.showPetrol || this.showDiesel) {
      this.handleCity('Mumbai');
      this.handleCity('Chennai');
      this.handleCity('Kolkata');
      this.handleCity('Delhi');
    }

  }
  getSerieIndex(name) {
    for (var i = 0; i < this.chart.ref.series.length; i++) {
      if (this.chart.ref.series[i].name.toString().includes(name))
        return i;
    }
    return -1;
  }
  handleCrude() {
    if (this.showCrude) {
      this.chart.addSerie({
        yAxis: 0,
        name: 'Crude',
        data: this.filteredData.crudeData
      });
    }
    else {
      this.chart.removeSerie(this.getSerieIndex('Crude'));
    }
  }
  handleFuel(fuelName) {
    console.log(fuelName);
    if (this.showFuel[fuelName]) {
      this.handleCity('Kolkata');
      this.handleCity('Delhi');
      this.handleCity('Chennai');
      this.handleCity('Mumbai');
    }
    else {
      while (this.getSerieIndex(fuelName) != -1) {
        console.log(this.chart.ref.series[this.getSerieIndex(fuelName)]);
        this.chart.removeSerie(this.getSerieIndex(fuelName));
      }
    }
  }
  handleCity(cityName: string) {
    console.log(cityName);
    if (this.showCity[cityName]) {
      if (this.showFuel['Petrol']) {
        console.log('petrol' + cityName)
        this.chart.addSerie({
          yAxis: 0,
          name: 'Petrol ' + cityName,
          data: this.filteredData.petrolData[(cityName.toLowerCase())]
        })
      }
      if (this.showFuel['Diesel']) {
        this.chart.addSerie({
          yAxis: 0,
          name: 'Diesel ' + cityName,
          data: this.filteredData.dieselData[(cityName.toLowerCase())]
        })
      }
    }
    else {
      while (this.getSerieIndex(cityName) != -1) {
        this.chart.removeSerie(this.getSerieIndex(cityName));
      }
    }
  }
  fetchData() {
    this.getDataService.getCrude().subscribe(
      (data) => {
        this.crudeData = data;
        console.log('crude');
        this.applyFilters();
      }
    );
    this.getDataService.getPetrol().subscribe(
      (data: PetrolData) => {
        this.petrolData = data;
        console.log('petrol');
        this.applyFilters();
      }
    );
    this.getDataService.getDiesel().subscribe(
      (data: DieselData) => {
        this.dieselData = data;
        console.log('diesel');
        this.applyFilters();
      }
    )
  }
}
class OilData {
  constructor() {
    this.petrolData = new PetrolData();
    this.dieselData = new DieselData();
  }
  public crudeData: any;
  public petrolData;
  public dieselData;
}
class PetrolData {
  public chennai: any;
  public mumbai: any;
  public delhi: any;
  public kolkata: any;
}
class DieselData {
  public chennai: any;
  public mumbai: any;
  public delhi: any;
  public kolkata: any;
}
