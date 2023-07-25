import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BikeRentalComponent } from './bike-rental/bike-rental.component';
import { BikeComponent } from './bike-rental/bike/bike.component';
import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NetworkService } from './shared/network.service';
import { UtilityService } from './shared/utility.service';
import { BookingFormComponent } from './bike-rental/booking-form/booking-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from './shared/data.service';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { BookingComponent } from './confirmation/booking/booking.component';
import { CheckoutFormComponent } from './confirmation/checkout-form/checkout-form.component';
import { SuccessComponent } from './success/success.component';
import { AuthComponent } from './authentication/auth/auth.component';
import { AuthInterceptService } from './authentication/auth/auth-intercept.service';
import { AuthGuard } from './authentication/auth/auth.guard';
import { RoutingModule } from './routing.module';


// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'ballinastoe',
//     pathMatch: 'full',
//   },
//   {
//     path: 'ballinastoe',
//     component: BikeRentalComponent,
//     data: { town: 'ballinastoe' },
//   },
//   {
//     path: 'ticknock',
//     component: BikeRentalComponent,
//     data: { town: 'ticknock' },
//   },
//   {
//     path: 'cart',
//     canActivate:[AuthGuard],
//     component: ConfirmationComponent,
//   },
//   {
//     path: 'success',
//     component: SuccessComponent,
//   },
//   {
//     path: 'not-found',
//     component: NotFoundComponent,
//   },
//   {
//     path:'auth',
//     component:AuthComponent
//   },
//   {
//     path: '**',
//     redirectTo: 'not-found',
//   },
// ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BikeRentalComponent,
    BikeComponent,
    BookingFormComponent,
    ConfirmationComponent,
    BookingComponent,
    CheckoutFormComponent,
    SuccessComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule,
    // RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  providers: [NetworkService, UtilityService, DataService,{provide:HTTP_INTERCEPTORS, useClass: AuthInterceptService, multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
