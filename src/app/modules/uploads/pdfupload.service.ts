import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfuploadService {

  constructor(private http:HttpClient) { }


  public uploadPdfs(files:any):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/pdf/upload-all`,files);
  }
  uploadPdfs2(files: any): Observable<any[]> {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<any[]>(`http://localhost:8080/pdf/upload-all`, formData, { headers: headers });
  }
}
