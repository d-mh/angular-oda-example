import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

interface OdaParams {
  userId: string;
  paymentId: string;
  callbackUrl: string;
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
    };
  }

  returnSuccess(): void {
    console.log('success');
  }

  returnFailure(): void {
    console.log('failure');
  }

}
