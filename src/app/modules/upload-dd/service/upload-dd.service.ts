import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadDdService {
  private baseUrl ="http://localhost:8080/";
  pdfFileArraySubject: BehaviorSubject<File[]> = new BehaviorSubject<File[]>([]);
  bidInfoFiles : BehaviorSubject<File[]> = new BehaviorSubject<File[]>([]);
  getAllPdfFiles() {
    return this.pdfFileArraySubject;
  }

  getAllBidInfoFiles(){
    return this.bidInfoFiles;

  }
  

  uploadNotificationExcel(files: any): Observable<any>{
    const formData: FormData = new FormData();
      formData.append('files', files[0], files[0].name);
   

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<any[]>(`${this.baseUrl}`+"upload/orders", formData, { headers: headers });
  }
  ordersChangeAccepted(list:any):Observable<any[]>{
    return this.http.post<any[]>(`${this.baseUrl}`+"upload/accept-orders", list);
  }

  constructor(private http: HttpClient) { }
}
