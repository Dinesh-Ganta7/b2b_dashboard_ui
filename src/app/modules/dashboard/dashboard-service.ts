import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class DashboardService{

    private baseUrl ="http://localhost:8080/";
    constructor (private http:HttpClient){

    }

    getPositionsData(){
        return this.http.get(`${this.baseUrl}` + 'b2bDashboard/openPositionsData');
    }

    

    getBidSubmissionSummary(){
        return this.http.get(`${this.baseUrl}` + 'b2bDashboard/bidSubmissionSummary');
    }



}