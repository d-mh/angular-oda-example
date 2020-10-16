import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ODAWebviewService } from '../shared/service/oda.webview.service';

interface OdaParams {
  callbackUrl: string;
  restCallbackUrl: string;
}

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss']
})
export class GpsComponent implements OnInit {

  params: OdaParams;
  title: any;


  constructor(
    private _route: ActivatedRoute,
    private _service: ODAWebviewService,
  ) { }

  ngOnInit(): void {
    this.setOdaParams(this._route.snapshot.queryParams);
    console.log('params: ', this.params);

    this.getLocation();
  }

  setOdaParams(_params: Params): void {
    this.params = {
      callbackUrl: _params.callbackUrl || '',
      restCallbackUrl: _params.restCallbackUrl || '',
    };
  }

  getLocation(): void {

    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(postion => {
        console.log('pos', postion);
        this.title = `lat: ${postion.coords.latitude}; lng: ${postion.coords.longitude}`;

        this.sendSuccess(postion);
      });
    } else {
      console.log('navigator not allowed here');
      this.title = 'navigator not allowed here';

      this.sendFailure();
    }
  }


  sendSuccess(postion: Position): void {
    const successData = {
      status: 'success',
      lat: postion.coords.latitude,
      lng: postion.coords.longitude,
      callbackUrl: this.params.callbackUrl,
    };

    this.sendDataBackToODA(successData);
  }

  sendFailure(): void {
    const failureData = {
      status: 'failure',
      callbackUrl: this.params.callbackUrl,
    };

    this.sendDataBackToODA(failureData);
  }

  sendDataBackToODA(data: any): void {
    this._service.sendDataBackToODA(this.params.restCallbackUrl, data).subscribe(
      success => {
        console.log('success:', success);
        window.close();
      },
      error => {
        console.error('error:', error);
        window.close();
      },
    );
  }
}
