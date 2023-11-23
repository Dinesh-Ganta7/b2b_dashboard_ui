import { HttpClient } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BidinfoService {
  
  private baseUrl ="http://localhost:8080";
  private bidInfoDetails: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  constructor(private http: HttpClient) {}
  getBidInfoDetails() {
    return this.bidInfoDetails;
  }

  getAllBidInfo(){
    return this.http.get(`${this.baseUrl}`+'/bid-info');
  }

  updateBidInfo(data:any){
    return  this.http.put((`${this.baseUrl}`+'/bid-info'), data)
  }
}
