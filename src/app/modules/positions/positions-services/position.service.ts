import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private baseUrl ="http://localhost:8080/";
  constructor(private http: HttpClient) { }
  private positionDetails: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private allPositionsDetails: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  
  // Send data to Mat-drawer
  getPositionDetails() {
    return this.positionDetails;
  }
  // From backend
  getAllPositionDetails(){
    return this.http.get(`${this.baseUrl}`+'positions');
 }
 getAllPositionDetails1(){
  return this.allPositionsDetails;
}
getAllrecruiters(){
  return this.http.get(`${this.baseUrl}`+'recruiters/getallhr'); 
}

 
  // getAllRegionCode(){
  //   return this.http.get(`${this.baseUrl}`+'region/all');

  // }
  // getAllBusinessUnits(){
  //   return this.http.get(`${this.baseUrl}`+'businessunit/all');
  // }

  // getAllproductLine(){
  //   return this.http.get(`${this.baseUrl}`+'product/all');

  // }

  updatePositionDetails(updateDetailsObj){
    console.log("updatedetails obj",updateDetailsObj)
    return this.http.put(`${this.baseUrl}`+'positions',updateDetailsObj);
  }

  // addNewRegion(addnewRegionOptionObj){
  //   return this.http.post(`${this.baseUrl}`+'region/addRegion',addnewRegionOptionObj);

  // }

}
