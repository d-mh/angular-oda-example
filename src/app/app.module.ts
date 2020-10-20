import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxStripeModule.forRoot('pk_test_51HbS6oCq3jNEslxH023W69OIi7G16fn2OjFF7H75KnTh6tjMUb1loKVJf7a35xzydMJ29sLnEBa3pXjixPIUJxFi00fzDrguzU'),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
