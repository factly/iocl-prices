import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http:HttpClient) { }
  CrudeUrl = 'assets/crude.json';
  PetrolUrl = 'assets/petrol.json';
  DieselUrl = 'assets/diesel.json';
  getCrude(){
    return this.http.get(this.CrudeUrl);
  }
  getPetrol(){
    return this.http.get(this.PetrolUrl);
  }
  getDiesel(){
    return this.http.get(this.DieselUrl);
  }
}
