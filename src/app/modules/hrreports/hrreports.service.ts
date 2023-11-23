import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HrreportsService {
  private baseUrl="http://localhost:8080/";
  constructor(private http: HttpClient) { }

  getRecruiterDetails(){
    return this.http.get(`${this.baseUrl}`+'hrReports/getRecruiterDetails');
  }

  getPositionByMonthDetails(){
    return this.http.get(`${this.baseUrl}`+'hrReports/getPositionByMonth');
  }

  getPositionBySkillDetails(){
    return this.http.get(`${this.baseUrl}`+'hrReports/getPositionBySkill');
  }

  getDetails(name:string): Observable < any > {
    return this.http.get(`${this.baseUrl}`+`hrReports/getDetails/${name}`);
  }

  getBidReports(){
    return this.http.get(`${this.baseUrl}`+'hrReports/GetBidDetails');
  }
}
