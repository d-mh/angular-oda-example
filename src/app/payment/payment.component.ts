import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StripeService } from 'ngx-stripe';
import { interval, Subscription } from 'rxjs';

interface ODARequestParams {
  sessionId: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

  requestParams: ODARequestParams;
  progressBarValue = 100;
  subscription: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _stripeService: StripeService,
  ) { }

  ngOnInit(): void {
    this.animateProgressBar();

    this.setOdaParams(this._route.snapshot.queryParams);

    this.checkout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setOdaParams(_params: Params): void {
    this.requestParams = {
      sessionId: _params.sessionId,
    };

    this.validateRequestParams();
  }

  checkout(): void {

    this._stripeService.redirectToCheckout({
      sessionId: this.requestParams.sessionId,
    }).subscribe(
      success => { /*console.log('redirectToCheckout success', success);*/ },
      error => { /*console.error('redirectToCheckout error', error);*/ },
      () => { /*console.log('redirectToCheckout completed');*/ },
    );

  }

  private validateRequestParams(): void {
    Object.keys(this.requestParams).forEach(key => {
      if (!this.requestParams[key]) {
        throw new Error('Missing value for key in requestParams: ' + key);
      }
    });
  }

  private animateProgressBar(): void {

    this.subscription = interval(100).subscribe(value => {
      this.progressBarValue = value % 100;
    });

  }

}
