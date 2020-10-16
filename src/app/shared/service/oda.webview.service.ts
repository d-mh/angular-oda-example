import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ODAWebviewService {

  constructor(
    private _http: HttpClient,
  ) { }

  sendDataBackToODA(callbackUrl: string, data: any): Observable<any> {

    return this._http.post(callbackUrl, data);
  }
}
