import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ODAWebviewService } from '../shared/service/oda.webview.service';

interface OdaParams {
  userId: string;
  paymentId: string;
  callbackUrl: string;
  restCallbackUrl: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  params: OdaParams;

  constructor(
    private _route: ActivatedRoute,
    private _service: ODAWebviewService,
  ) { }

  ngOnInit(): void {

    this.setOdaParams(this._route.snapshot.queryParams);
    console.log('params: ', this.params);
  }

  setOdaParams(_params: Params): void {
    this.params = {
      userId: _params.userId,
      paymentId: _params.paymentId,
      callbackUrl: _params.callbackUrl,
      restCallbackUrl: _params.restCallbackUrl,
    };
  }

  returnSuccess(): void {
    console.log('success');

    const successData = {
      status: 'success',
      userId: 'changed by backend: ' + this.params.userId,
      paymentId: 'changed by backend: ' + this.params.paymentId,
      callbackUrl: this.params.callbackUrl,
    };

    this._service.sendDataBackToODA(this.params.restCallbackUrl, successData).subscribe(
      success => { console.log('success:', success); },
      error => { console.error('error:', error); },
    );
  }

  returnFailure(): void {
    console.log('failure');

    const failureData = {
      status: 'failure',
      callbackUrl: this.params.callbackUrl,
    };

    this._service.sendDataBackToODA(this.params.restCallbackUrl, failureData).subscribe(
      success => { console.log('success:', success); },
      error => { console.error('error:', error); },
    );
  }

}
