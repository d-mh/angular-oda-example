import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private _http: HttpClient,
  ) { }

  sendDataBackToODA(callbackUrl: string, data: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'text/plain');
    
    return this._http.post(callbackUrl, data, { headers });
  }
}
