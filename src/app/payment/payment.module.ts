import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { SharedModule } from '../shared/shared.module';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';


@NgModule({
  declarations: [PaymentComponent, PaymentSuccessComponent, PaymentFailureComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
  ]
})
export class PaymentModule { }
