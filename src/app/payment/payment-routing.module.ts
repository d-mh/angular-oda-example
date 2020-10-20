import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentFailureComponent } from './payment-failure/payment-failure.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentComponent } from './payment.component';

const routes: Routes = [
  { path: '', component: PaymentComponent },
  { path: 'success', component: PaymentSuccessComponent },
  { path: 'failure', component: PaymentFailureComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
