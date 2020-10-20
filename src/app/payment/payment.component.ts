import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StripeService } from 'ngx-stripe';
import { ODAWebviewService } from '../shared/service/oda.webview.service';


declare var stripe: any;

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
    private _stripeService: StripeService,
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

  async checkout(): Promise<void> {

    this._stripeService.redirectToCheckout({
      sessionId: 'cs_test_Cvouahw25GsSO5VAeDphmdYR9ijmknEqdfMAGFGnlRweazlKfDcHwGjG',
    }).subscribe(
      success => { console.log('redirectToCheckout success', success); },
      error => { console.error('redirectToCheckout error', error); },
      () => console.log('redirectToCheckout completed'),
    );

    // const stripe = require('stripe')('sk_test_51HbS6oCq3jNEslxHoOcG6KqMnxdVnuXNM8CUtLJ1BuSmFhNnyHtWrCUxdvQqVW9q3aZxYNRbv75PIfu66CbDAWzd00m0D4xs2p');

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: 'usd',
    //         product_data: {
    //           name: 'T-shirt',
    //         },
    //         unit_amount: 2000,
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: 'payment',
    //   success_url: 'https://example.com/success',
    //   cancel_url: 'https://example.com/cancel',
    // });

    // this._stripeService.redirectToCheckout({
    //   // lineItems: [{}]
    //   // lineItems: [
    //   //   { price: 'price_1HeGBPCq3jNEslxH8uCRZv4O', quantity: 1 },
    //   // ],
    //   mode: 'payment',
    //   successUrl: 'https://f3da292b82d0.ngrok.io/stripe-success',
    //   cancelUrl: 'https://f3da292b82d0.ngrok.io/stripe-failure',
    // }).subscribe(
    //   success => { console.log('redirectToCheckout success', success); },
    //   error => { console.error('redirectToCheckout error', error); },
    //   () => console.log('redirectToCheckout completed'),
    // );

    // lineItems: [
    //   // Replace with the ID of your price
    //   {price: 'price_123', quantity: 1},
    // ],
    // mode: 'payment',
    // successUrl: 'https://your-website.com/success',
    // cancelUrl: 'https://your-website.com/canceled',
    // const session = await stripe.checkout.sessions.create({
    //   success_url: 'https://6d7b71ba7aa2.ngrok.io/stripe-success',
    //   cancel_url: 'https://6d7b71ba7aa2.ngrok.io/stripe-failure',
    //   payment_method_types: ['card'],
    //   mode: 'payment',
    // });

  }

}

/*

<script type="text/javascript">
  // Create an instance of the Stripe object with your publishable API key
  var stripe = Stripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
  var checkoutButton = document.getElementById("checkout-button");

  checkoutButton.addEventListener("click", function () {
    fetch("/create-session", {
      method: "POST",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (session) {
        return stripe.redirectToCheckout({ sessionId: session.id });
      })
      .then(function (result) {
        // If redirectToCheckout fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using error.message.
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  });
</script>
*/